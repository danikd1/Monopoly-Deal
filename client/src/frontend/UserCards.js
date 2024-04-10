import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import { Box, Typography, Card, CardActionArea, Button, CardMedia, CardContent } from '@mui/material';

const UserCards = ({currentTurn, currentUser}) => {
    const [cards, setCards] = useState([]);
    const { title } = useParams();

    useEffect(() => {
        const fetchUserCards = async () => {
            try {
                const userName = localStorage.getItem('username');
                const response = await fetch('/sessions/cards', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Отправляем имя пользователя в заголовке запроса
                        'Username': userName,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error("Error fetching user cards:", error);
            }
        };

        fetchUserCards();
    }, []);

    const handleAddToBank = async (cardId) => {
        const userName = localStorage.getItem('username');

        try {
            const response = await fetch(`/sessions/${title}/bank`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, cardId }),
            });

            if (!response.ok) {
                throw new Error('Failed to add card to bank');
            }

            // Обновляем состояние, удаляя карту, добавленную в банк
            const updatedCards = cards.filter(card => card.id !== cardId);
            setCards(updatedCards);
            console.log('Card added to bank successfully');
        } catch (error) {
            console.error('Error moving card to bank:', error);
        }
    };

    const handleAddToProperty = async (cardId) => {
        const userName = localStorage.getItem('username');

        try {
            const response = await fetch(`/sessions/${title}/property`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, cardId }),
            });

            if (!response.ok) {
                throw new Error('Failed to add card to property');
            }

            // Обновляем состояние, удаляя карту, добавленную в собственность
            const updatedCards = cards.filter(card => card.id !== cardId);
            setCards(updatedCards);
            console.log('Card added to property successfully');
        } catch (error) {
            console.error('Error moving card to property:', error);
        }
    };

    return (
        <Box sx={{ pt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Ваши карты:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0}>
                {cards.map((card) => (
                    <Card sx={{ maxWidth: 200, m: 1 }} key={card.id}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="auto"
                                image={card.image}
                                alt={card.name}
                            />
                            <CardContent>
                                <Box>
                                    {['money', 'action'].includes(card.type) && (
                                        <Button
                                            size="small"
                                            onClick={() => handleAddToBank(card.id)}
                                            variant="outlined"
                                            color="primary"
                                            sx={{ mr: 1 }}
                                            disabled={currentUser !== currentTurn} // Дезактивируем кнопку, если не ваш ход
                                        >
                                            В банк
                                        </Button>
                                    )}
                                    {card.type === 'property' && (
                                        <Button
                                            size="small"
                                            onClick={() => handleAddToProperty(card.id)}
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ mr: 1 }}
                                            disabled={currentUser !== currentTurn} // Та же логика дезактивации
                                        >
                                            В собственность
                                        </Button>
                                    )}
                                    {card.type === 'action' && (
                                        <Button
                                            size="small"
                                            onClick={() => handleAddToBank(card.id)}
                                            variant="outlined"
                                            color="error"
                                            disabled={currentUser !== currentTurn} // Дезактивируем кнопку, если не ваш ход
                                        >
                                            Сыграть карту
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );

};

export default UserCards;
