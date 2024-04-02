import React, { useEffect, useState } from 'react';
import {List, ListItem, ListItemText, Divider, Typography} from '@mui/material';

const ActiveSessionsList = () => {
    const [activeSessions, setActiveSessions] = useState([]);

    useEffect(() => {
        const fetchActiveSessions = async () => {
            try {
                const response = await fetch('/sessions/active');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setActiveSessions(data);
            } catch (error) {
                console.error("Error fetching active sessions:", error);
            }
        };

        fetchActiveSessions();
    }, []);

    return (
        <List component="nav" aria-label="active game sessions">
            <Typography component="h1" variant="h5">
                Активные игровые сессии
            </Typography>
            {activeSessions.map((session, index) => (
                <>
                    <ListItem button key={session._id}>
                        <ListItemText
                            primary={session.title}
                            secondary={`Пользователи: ${session.users.map(user => user.name).join(', ')} (${session.users.length}/${session.maxPlayers}) - Статус: ${session.status}`} />
                    </ListItem>
                    {index < activeSessions.length - 1 && <Divider />}
                </>
            ))}
        </List>
    );
};

export default ActiveSessionsList;

