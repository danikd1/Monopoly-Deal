// controllers/gameSessionController.js

const GameSession = require('../models/GameSession'); // Импорт модели игровой сессии
const { shuffle, cards } = require('../models/deck'); // Импорт функции shuffle и массива карт

exports.dealCardsToPlayers = async (req, res) => {
    const { title } = req.params; // Получение названия сессии из параметров запроса

    try {
        const session = await GameSession.findOne({ title }).populate('users');
        if (!session) {
            return res.status(404).send('Сессия не найдена');
        }

        shuffle(cards);

        const numberOfCards = 5;
        const playerCards = session.users.map(player => ({
            playerId: player._id,
            cards: cards.slice(0, numberOfCards)
        }));

        session.playerCards = playerCards;
        await session.save();

        res.status(200).send('Карты разданы игрокам в сессии');
    } catch (error) {
        console.error('Ошибка при раздаче карт:', error);
        res.status(500).send('Ошибка на сервере');
    }
};
