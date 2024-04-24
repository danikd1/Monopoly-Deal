import React, { useState } from 'react';
import SessionsList from './SessionsList';
import JoinSessionForm from './JoinSessionForm';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Snackbar, Alert, Typography } from '@mui/material';

const JoinSessionPage = () => {
    const navigate = useNavigate();
    const [selectedSession, setSelectedSession] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleJoin = (session) => {
        setSelectedSession(session);
    };

    const handleConfirmJoin = async (title, userName) => {
        try {
            const response = await fetch(`/sessions/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title, userName }),
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Предполагается, что сервер возвращает объект с userId
            const data = await response.json();
            if (data.userId) {
                localStorage.setItem('userId', data.userId); // Сохраняем userId в localStorage
                console.log('Saved userId:', data.userId);
                console.log("Successfully joined the session and userId saved");
            } else {
                console.log("Successfully joined the session, but no userId returned");
            }

            navigate(`/game/${title}`);
        } catch (error) {
            console.error("Error joining session:", error);
            setSnackbarMessage("Ошибка при присоединении к сессии");
            setOpenSnackbar(true);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div>
            <SessionsList onJoin={handleJoin}/>
            {selectedSession && <JoinSessionForm session={selectedSession} onJoin={handleConfirmJoin}/>}
            <Box mt={2}>
                <Button variant="outlined" color="primary" onClick={handleBack}>
                    Назад
                </Button>
            </Box>
            {/* Snackbar для показа сообщения об ошибке */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default JoinSessionPage;
