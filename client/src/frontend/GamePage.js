import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeaveSessionButton from "./LeaveSession";
import UserCards from "./UserCards";
import DrawCards from "./DrawCards";
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Grid } from '@mui/material';
import PropertyCards from "./PropertyCards";
import BankCards from "./BankCards";



const GamePage = () => {
    const { title } = useParams();
    const [sessionDetails, setSessionDetails] = useState(null);

    useEffect(() => {
        const fetchSessionDetails = async () => {
            try {
                const response = await fetch(`/sessions/details/${title}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSessionDetails(data);
            } catch (error) {
                console.error("Error fetching session details:", error);
            }
        };

        fetchSessionDetails();
    }, [title]);

    if (!sessionDetails) {
        return <div>Загрузка деталей сессии...</div>;
    }


    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Игровая сессия: {sessionDetails.title}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Текущие участники:
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
                    <DrawCards />
                    <UserCards />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 3 }}>
                {/* Компоненты для отображения карт в банке */}
                <BankCards sessionDetails={sessionDetails} />

                {/* Компонент для отображения карт в собственности */}
                <PropertyCards sessionDetails={sessionDetails} />
            </Grid>
            <Box sx={{ mt: 4 }}>
                <LeaveSessionButton sessionTitle={sessionDetails.title} />
            </Box>
        </Box>
    );

}

export default GamePage;

