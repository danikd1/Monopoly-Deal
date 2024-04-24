import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LeaveSessionButton from "./LeaveSession";
import UserCards from "./UserCards";
import DrawCards from "./DrawCards";
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from '@mui/material';
import PropertyCards from "./PropertyCards";
import BankCards from "./BankCards";

const GamePage = () => {
    const { title } = useParams();
    const [sessionDetails, setSessionDetails] = useState(null);
    const [open, setOpen] = useState(false);
    const [actionCount, setActionCount] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchSessionDetails();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [title]);

    const fetchSessionDetails = async () => {
        try {
            const response = await fetch(`/sessions/details/${title}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSessionDetails(data);
            if (data.status === 'completed' && data.winner) {
                setOpen(true);
            }
        } catch (error) {
            console.error("Error fetching session details:", error);
        }
    };

    const handleEndTurn = useCallback(async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch(`/sessions/endTurn/${title}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to end turn');
            }
            await fetchSessionDetails();
            setActionCount(0);
        } catch (error) {
            console.error('Error ending turn:', error);
        }
    }, [title]);

    const incrementActionCount = useCallback(() => {
        setActionCount(prevCount => prevCount + 1);
    }, []);

    useEffect(() => {
        if (actionCount >= 3) {
            handleEndTurn();
        }
    }, [actionCount, handleEndTurn]);

    if (!sessionDetails) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Игра окончена!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {sessionDetails?.winner} выиграл игру собрав три полных комплекта собственности!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ mt: -3 }}>
                        <LeaveSessionButton sessionTitle={sessionDetails.title} />
                    </Box>
                </DialogActions>
            </Dialog>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Игровая сессия: {sessionDetails.title}
                    </Typography>
                    <List>
                        {sessionDetails.users.map((user, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar alt={user.name} src={user.avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={user.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6" gutterBottom>
                        Ход игрока: {sessionDetails.users.find(user => user._id === sessionDetails.currentTurn)?.name || "Ожидание..."}
                    </Typography>
                    <DrawCards currentTurn={sessionDetails.currentTurn} />
                    <Button onClick={handleEndTurn} variant="contained" color="primary">
                        Закончить ход
                    </Button>
                    <UserCards
                        currentTurn={sessionDetails.currentTurn}
                        currentUser={localStorage.getItem('userId')}
                        cards={sessionDetails.playerCards}
                        onAction={incrementActionCount}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 3 }}>
                <BankCards sessionDetails={sessionDetails} />
                <PropertyCards sessionDetails={sessionDetails} />
            </Grid>
            <Box sx={{ mt: 4 }}>
                <LeaveSessionButton sessionTitle={sessionDetails.title} />
            </Box>
        </Box>
    );
};

export default GamePage;
