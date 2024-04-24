import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateSessionForm = () => {
    const [title, setTitle] = useState(''); // Состояние для хранения названия сессии
    const [maxPlayers, setMaxPlayers] = useState(2);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, maxPlayers }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Session created:', result);
            setTitle('');
            setMaxPlayers(2);
            navigate('/');
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={handleBack} sx={{ mb: 2 }}>
                        Назад
                    </Button>
                </Grid>
                <Grid item xs>
                    <Typography component="h1" variant="h5" textAlign="center">
                        Создать новую игровую сессию
                    </Typography>
                </Grid>
            </Grid>

            <FormControl fullWidth margin="normal">
                <InputLabel id="max-players-select-label">Макс. игроков</InputLabel>
                <Select
                    labelId="max-players-select-label"
                    id="max-players-select"
                    value={maxPlayers}
                    label="Макс. игроков"
                    onChange={(e) => setMaxPlayers(e.target.value)}
                >
                    {[2, 3, 4, 5].map((number) => (
                        <MenuItem key={number} value={number}>
                            {number}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="sessionName"
                    label="Название сессии"
                    name="sessionName"
                    autoComplete="session-name"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Создать сессию
                </Button>
            </Box>
        </Box>
    );
};

export default CreateSessionForm;
