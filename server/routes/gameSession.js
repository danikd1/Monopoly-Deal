const express = require('express');
const router = express.Router();
const gameSessionController = require('../controllers/gameSessionController');

// Маршрут для начала игры и раздачи карт
router.post('/sessions/game/:title', gameSessionController.dealCardsToPlayers);

module.exports = router;
