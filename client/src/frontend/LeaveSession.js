import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';

const LeaveSessionButton = ({ sessionTitle }) => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('username'); // Получение имени пользователя
    const { title } = useParams();
    console.log("Имя пользователя из localStorage:", userName);

    const handleLeaveSession = async () => {
        try {
            // Обновление URL согласно новой структуре эндпоинта
            await fetch(`/sessions/leave/${sessionTitle}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Передача только имени пользователя, так как название сессии теперь часть URL
                body: JSON.stringify({ userName }),
            });
            // Очистка имени пользователя из localStorage после выхода
            localStorage.removeItem('username');
            // Опционально: обновите UI или состояние для отражения того, что пользователь покинул сессию
            navigate('/'); // Перенаправление на главную страницу или список сессий
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
