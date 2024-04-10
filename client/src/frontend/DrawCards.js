// DrawCards.js
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { Button, Zoom, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const DrawCards = () => {
    const { title } = useParams(); // Используем название сессии из URL
    const [cards, setCards] = useState([]);
    const [hovered, setHovered] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleDrawCards = async () => {
        const userName = localStorage.getItem('username'); // Предполагается, что имя пользователя сохранено в localStorage
        try {
            const response = await fetch(`/sessions/${title}/draw`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Обработка успешного взятия карт
            const data = await response.json();
            setCards(data);
        } catch (error) {
            console.error('Error drawing cards:', error);
            setOpenSnackbar(true); // Показываем Snackbar при ошибке
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                mt: 3,
                mb: 3
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Zoom in={true} style={{ transitionDelay: hovered ? '100ms' : '0ms' }}>
                <img
                    src={`${process.env.PUBLIC_URL}/images/back.png`}
                    alt="Колода карт"
                    style={{
                        maxWidth: '200px',
                        height: 'auto',
                        marginBottom: '10px',
                        transform: hovered ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s'
                    }}
                />
            </Zoom>
            <Zoom in={true} style={{ transitionDelay: hovered ? '100ms' : '0ms' }}>
                <Box textAlign="left">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDrawCards}
                    >
                        Взять две карты из колоды
                    </Button>
                </Box>
            </Zoom>
            {/* Snackbar для отображения уведомления */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Достигнут лимит карт
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default DrawCards;
