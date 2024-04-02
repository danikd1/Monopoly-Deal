import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import CreateSessionForm from "./frontend/CreateSessionForm";
import JoinSessionPage from "./frontend/JoinSessionPage";
import GamePage from "./frontend/GamePage"
import Navbar from "./frontend/Navbar";
import SessionsList from "./frontend/SessionsList";
import ActiveSessionsList from "./frontend/ActiveSessionsList";
import Sidebar from "./frontend/components/SideBar";


const App = () => {

  const [state, setState] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  // получение GET маршрута с сервера Express, который соответствует GET из server.js
  useEffect(() => {
    callBackendAPI()
    .then(res => setState(res.express))
    .catch(err => console.log(err));
  }, [])

    return (
        <Router>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Sidebar /> {/* Вставляем Sidebar для навигации */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Монополия: Сделка
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/create-session">Создать сессию</Button>
                    <Button color="inherit" component={RouterLink} to="/join-session">Присоединиться</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Routes>
                    <Route path="/" element={
                        <>
                            {/* Отображаем список активных сессий на главной странице */}
                            <ActiveSessionsList />
                        </>
                    } />
                    <Route path="/create-session" element={
                        <>
                            <CreateSessionForm />
                        </>
                    } />
                    <Route path="/join-session" element={<JoinSessionPage />} />
                    <Route path="/game/:title" element={<GamePage />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
