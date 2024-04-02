import React from 'react';
import { Box, CardMedia, Chip, Grid, Paper, Typography } from '@mui/material';

const BankCards = ({ sessionDetails }) => {
    return (
        <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Банк
                </Typography>
                {sessionDetails.bank.map((bankEntry, index) => (
                    <Box key={index} mb={2} sx={{ overflowX: 'auto', display: 'flex', alignItems: 'center' }}>
                        <Chip label={`Игрок: ${bankEntry.playerId.name}`} color="primary" sx={{ mr: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                            {bankEntry.cards.map((card, cardIndex) => (
                                <CardMedia
                                    key={cardIndex}
                                    component="img"
                                    sx={{ width: 128, height: 192 }}
                                    image={card.image}
                                    alt={card.name}
                                />
                            ))}
                        </Box>
                    </Box>
                ))}
            </Paper>
        </Grid>
    );
};

export default BankCards;
