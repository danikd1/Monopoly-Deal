import React from 'react';
import { Box, CardMedia, Chip, Grid, Paper, Typography } from '@mui/material';

const PropertyCards = ({ sessionDetails }) => {
    return (
        <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Собственность
                </Typography>
                {sessionDetails.property.map((propertyEntry, index) => (
                    <Box key={index} mb={2} sx={{ overflowX: 'auto', display: 'flex', alignItems: 'center' }}>
                        <Chip label={`Игрок: ${propertyEntry.playerId.name}`} color="secondary" sx={{ mr: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                            {propertyEntry.cards.map((card, cardIndex) => (
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

export default PropertyCards;
