import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import { Box, Typography, Card, CardActionArea, Button, CardMedia, CardContent } from '@mui/material';
import { fetchUserCards, addToBank, addToProperty } from '../api.js';

const UserCards = ({currentTurn, currentUser, onAction}) => {
    const [cards, setCards] = useState([]);
    const { title } = useParams();

    useEffect(() => {
        const userName = localStorage.getItem('username');
        const fetchCards = async () => {
            try {
                const data = await fetchUserCards(title, userName);
                const userCards = data.playerCards.find(p => p.playerId === currentUser);
                setCards(userCards ? userCards.cards : []);
            } catch (error) {
                console.error("Error fetching user cards:", error);
            }
        };
        fetchCards();
        const intervalId = setInterval(fetchCards, 1000);
        return () => clearInterval(intervalId);
    }, [title, currentUser]);

    const handleAddToBank = async (cardId) => {
        const userName = localStorage.getItem('username');
        try {
            await addToBank(title, userName, cardId);
            const updatedCards = cards.filter(card => card.id !== cardId);
            setCards(updatedCards);
            console.log('Card moved to bank, incrementing action count');
            onAction();
        } catch (error) {
            console.error('Error moving card to bank:', error);
        }
    };

    const handleAddToProperty = async (cardId) => {
        const userName = localStorage.getItem('username');
        try {
            await addToProperty(title, userName, cardId);
            const updatedCards = cards.filter(card => card.id !== cardId);
            setCards(updatedCards);
            console.log('Card added to property, incrementing action count');
            onAction();
        } catch (error) {
            console.error('Error moving card to bank:', error);
        }
    };

    const handlePlayActionCard = async (cardId) => {
        const userName = localStorage.getItem('username');
        try {
            const response = await fetch(`/sessions/${title}/playBirthday`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: currentUser, cardId }),
            });

            if (!response.ok) {
                throw new Error('Failed to play action card');
            }

            const updatedCards = cards.filter(card => card.id !== cardId);
            setCards(updatedCards);
            onAction();
        } catch (error) {
            console.error('Error playing action card:', error);
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
                                            disabled={currentUser !== currentTurn}
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
                                            disabled={currentUser !== currentTurn}
                                        >
                                            В собственность
                                        </Button>
                                    )}
                                    {card.type === 'action' && (
                                        <Button
                                            size="small"
                                            onClick={() => handlePlayActionCard(card.id)}
                                            variant="outlined"
                                            color="error"
                                            disabled={currentUser !== currentTurn}
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
