import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const JoinSessionForm = ({ session, onJoin }) => {
    const [userName, setUserName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        onJoin(session.title, userName);

        // Сохранение имени пользователя в localStorage после успешного входа
        localStorage.setItem('username', userName);
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '20px'
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography variant="h6" component="h2" gutterBottom>
                Присоединиться к игровой сессии
            </Typography>
            <TextField
                required
                id="userName"
                label="Ваше имя"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                Присоединиться к сессии
            </Button>
        </Box>
    );
};

export default JoinSessionForm;
