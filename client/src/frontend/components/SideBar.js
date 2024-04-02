import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RulesPage from '../RulesPage';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rulesDialogOpen, setRulesDialogOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const handleRulesDialogToggle = () => {
        setRulesDialogOpen(!rulesDialogOpen);
    };

    const menuItems = [
        { text: 'Главная', path: '/' },
        { text: 'Правила игры', action: handleRulesDialogToggle },
    ];

    return (
        <>
            <IconButton onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
            <Drawer anchor='left' open={isOpen} onClose={toggleDrawer(false)}>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={index} onClick={item.action ? item.action : toggleDrawer(false)} component={item.path ? Link : 'button'} to={item.path}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Dialog open={rulesDialogOpen} onClose={handleRulesDialogToggle} aria-labelledby="rules-dialog-title" fullWidth={true} maxWidth="md">
                <RulesPage />
                <DialogActions>
                    <Button onClick={handleRulesDialogToggle}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Sidebar;

