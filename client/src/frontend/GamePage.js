import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeaveSessionButton from "./LeaveSession";
import UserCards from "./UserCards";
import DrawCards from "./DrawCards";
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Grid, Button } from '@mui/material';
import PropertyCards from "./PropertyCards";
import BankCards from "./BankCards";

const GamePage = () => {
    const { title } = useParams();
    const [sessionDetails, setSessionDetails] = useState(null);

    useEffect(() => {
        fetchSessionDetails();
    }, [title]);

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


    if (!sessionDetails) {
        return <div>Загрузка деталей сессии...</div>;
    }

    const handleEndTurn = async () => {
        // Предполагаем, что у вас есть доступ к ID текущего пользователя
        const userId = localStorage.getItem('userId'); // Пример получения userId
        try {
            const response = await fetch(`/sessions/endTurn/${title}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }), // Передаем ID пользователя в теле запроса
            });

            if (!response.ok) {
                throw new Error('Failed to end turn');
            }
            // Если сервер успешно обработал запрос, обновляем детали сессии
            // для отражения изменений в состоянии игры.
            await fetchSessionDetails(); // Перезапрашиваем детали сессии, чтобы обновить состояние
        } catch (error) {
            console.error('Error ending turn:', error);
        }
    };


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
                    <Typography variant="h6" gutterBottom>
                        Ход игрока: {sessionDetails.users.find(user => user._id === sessionDetails.currentTurn)?.name || "Ожидание..."}
                    </Typography>
                    <DrawCards />
                    <Button onClick={handleEndTurn} variant="contained" color="primary">
                        Закончить ход
                    </Button>
                    <UserCards
                        currentTurn={sessionDetails.currentTurn}
                        currentUser={localStorage.getItem('userId')} // Пример получения ID текущего пользователя
                        cards={sessionDetails.playerCards} // Предполагается, что вы также передаёте карты как пропс
                    />
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
