import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';

const LeaveSessionButton = ({ sessionTitle }) => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('username');
    const { title } = useParams();
    console.log("Имя пользователя из localStorage:", userName);

    const handleLeaveSession = async () => {
        try {
            await fetch(`/sessions/leave/${sessionTitle}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }),
            });
            localStorage.removeItem('username');
            navigate('/');
        } catch (error) {
            console.error("Ошибка при выходе из сессии:", error);
        }
    };

    return (
        <Button
            variant="contained"
            color="error"
            onClick={handleLeaveSession}
            sx={{ mt: 2, mb: 2 }}
        >
            Покинуть сессию
        </Button>
    );
};

export default LeaveSessionButton;
