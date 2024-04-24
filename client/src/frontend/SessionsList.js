import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, CardActions, List, ListItem, ListItemText } from '@mui/material';

const SessionsList = ({ onJoin }) => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch('/sessions/active');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSessions(data);
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };

        fetchSessions();
        const intervalId = setInterval(fetchSessions, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
            {sessions.map(session => (
                <Card
                    key={session._id}
                    sx={{
                        width: 275,
                        backgroundImage: 'linear-gradient(290deg, #FFFFFF, #03a9f4)',
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {session.title}
                        </Typography>
                        <Typography sx={{ mb: 0.5 }} color="text.secondary">
                            Игроки: {session.users.length}/{session.maxPlayers}
                        </Typography>
                        <Typography sx={{ mb: 0.5 }} color="text.secondary">
                            Статус: {session.status}
                        </Typography>
                        <List dense>
                            {session.users && session.users.map((user, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={user.name}/>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => onJoin(session)}>Присоединиться</Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

export default SessionsList;


