import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';

function MainMenu() {
    return (
        <Container maxWidth="sm">
            <Box textAlign="center" mt={5}>
                <Typography variant="h2" gutterBottom>
                    Монополия: Сделка
                </Typography>
                <Button variant="contained" color="primary" size="large" fullWidth style={{ marginBottom: "20px" }}>
                    Начать игру
                </Button>
                <Button variant="outlined" color="secondary" size="large" fullWidth style={{ marginBottom: "20px" }}>
                    Правила
                </Button>
                <Button variant="outlined" size="large" fullWidth>
                    Настройки
                </Button>
            </Box>
        </Container>
    );
}

export default MainMenu;
