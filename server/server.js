const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const GameSession = require('./models/GameSession');
const User = require('./models/User');
const { shuffle, cards } = require('./models/deck');
mongoose.connect('mongodb://localhost:27017/PlayersDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 3010;

//для парсинга JSON тел запросов
app.use(express.json());

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


/*----------------------------------------------------------------------------------------*/
// Эндпоинт для создания новой игровой сессии
app.post('/sessions', async (req, res) => {
  try {
    const { title, maxPlayers } = req.body;
    if (!title || !maxPlayers) {
      return res.status(400).send('Title and maxPlayers are required');
    }
    const newSession = new GameSession({ title, maxPlayers, status: 'waiting', users: [] });
    await newSession.save();
    res.status(201).send(newSession);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/*----------------------------------------------------------------------------------------*/
// Эндпоинт для подключения к сессии и раздачи карт
app.post('/sessions/join', async (req, res) => {
  try {
    const { title, userName } = req.body;
    if (!title || !userName) {
      return res.status(400).send('Session title and user name are required');
    }

    const session = await GameSession.findOne({ title: title });
    if (!session) {
      return res.status(404).send('Session not found');
    }

    // Проверяем, не активна ли уже сессия или заполнена
    if (session.status === 'active' || session.users.length >= session.maxPlayers) {
      return res.status(400).send('The session is either active or full');
    }

    let user = await User.findOne({ name: userName });
    if (!user) {
      user = new User({ name: userName });
      await user.save();
    }

    // Добавляем пользователя к сессии, если его там нет
    if (!session.users.includes(user._id)) {
      session.users.push(user._id);
    }

    // Проверяем, стали ли мы активными (достигнут максимум игроков)
    if (session.users.length === session.maxPlayers) {
      session.status = 'active';
    }

    if (session.turnOrder.length !== session.maxPlayers) {
      session.turnOrder = session.users;
      session.currentTurn = session.turnOrder[0];
    }

    // Раздаем карты
    shuffle(cards); // Перемешиваем колоду
    const numberOfCards = 5; // Количество карт для раздачи
    const dealtCards = cards.splice(0, numberOfCards); // Извлекаем карты из колоды

    // Добавляем набор карт игроку в сессии
    const playerCardsIndex = session.playerCards.findIndex(entry => entry.playerId.equals(user._id));
    if (playerCardsIndex !== -1) {
      session.playerCards[playerCardsIndex].cards.push(...dealtCards);
    } else {
      session.playerCards.push({
        playerId: user._id,
        cards: dealtCards
      });
    }

    await session.save();

    res.status(200).json({
      message: 'User joined the session and cards were dealt',
      userId: user._id, // Возвращаем userId для использования на клиенте
      session
    });

  } catch (error) {
    console.error('Error joining session:', error);
    res.status(500).send('Server error');
  }
});



/*----------------------------------------------------------------------------------------*/
// Эндпоинт для получения списка всех активных сессий
app.get('/sessions/active', async (req, res) => {
  try {
    const activeSessions = await GameSession.find({
      status: { $in: ['waiting', 'active'] }
    })
        .populate('users', 'name -_id')
        .exec();

    res.status(200).json(activeSessions);
  } catch (error) {
    console.error("Error fetching active sessions:", error);
    res.status(500).send(error.message);
  }
});


/*----------------------------------------------------------------------------------------*/
// Эндпоинт для получения деталей сессии по названию
app.get('/sessions/details/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const sessionDetails = await GameSession.findOne({ title: title })
        .populate('users', 'name _id')
        .populate({
          path: 'bank.playerId',
          select: 'name _id'
        })
        .populate({
          path: 'property.playerId',
          select: 'name _id'
        })
        .exec();

    if (!sessionDetails) {
      return res.status(404).send('Сессия не найдена');
    }

    res.json(sessionDetails);
  } catch (error) {
    console.error("Ошибка при получении деталей сессии:", error);
    res.status(500).send(error.message);
  }
});


/*----------------------------------------------------------------------------------------*/
//эндпоинт, который позволяет пользователю выйти из сессии по названию сессии и имени пользователя
app.post('/sessions/leave/:title', async (req, res) => {
  const { userName } = req.body;
  const { title } = req.params;

  try {
    const user = await User.findOne({ name: userName });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }

    const session = await GameSession.findOne({ title }).populate('playerCards.playerId');
    if (!session) {
      return res.status(404).json({ message: 'Сессия не найдена.' });
    }

    // Находим и удаляем карты пользователя из сессии, возвращаем их в общую колоду
    const playerCardsIndex = session.playerCards.findIndex(entry => entry.playerId._id.equals(user._id));
    if (playerCardsIndex !== -1) {
      // Извлекаем карты пользователя
      const playerCards = session.playerCards[playerCardsIndex].cards;
      // Удаляем карты пользователя из сессии
      session.playerCards.splice(playerCardsIndex, 1);
    }

    // Удаляем пользователя из списка участников сессии
    session.users.pull(user._id);
    await session.save();

    res.status(200).json({ message: 'Пользователь успешно покинул сессию и его карты возвращены в колоду.' });
  } catch (error) {
    console.error("Ошибка при выходе из сессии:", error);
    res.status(500).send('Ошибка на сервере.');
  }
});

/*----------------------------------------------------------------------------------------*/
//эндпоинт, который показывает карты текущего пользователя
app.get('/sessions/cards', async (req, res) => {
  // Предполагаем, что имя пользователя отправляется в заголовке запроса
  const userName = req.headers['username'];

  if (!userName) {
    return res.status(400).send('User name is required');
  }

  try {
    // Находим пользователя по его имени
    const user = await User.findOne({ name: userName });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Находим сессию, к которой принадлежит пользователь
    const session = await GameSession.findOne({ users: user._id })
        .populate({
          path: 'playerCards.playerId',
          match: { _id: user._id }
        });

    if (!session) {
      return res.status(404).send('Session not found');
    }

    // Находим карты, принадлежащие пользователю
    const userCards = session.playerCards.find(entry => entry.playerId._id.equals(user._id));

    if (!userCards) {
      return res.status(404).send('Cards for the user not found');
    }

    // Возвращаем карты пользователя
    res.status(200).json(userCards.cards);
  } catch (error) {
    console.error('Error fetching user cards:', error);
    res.status(500).send('Server error');
  }
});


/*----------------------------------------------------------------------------------------*/
//эндпоинт для перемещения карты в банк игрока
app.post('/sessions/:title/bank', async (req, res) => {
  const { title } = req.params;
  const { userName, cardId } = req.body;

  try {
    const session = await GameSession.findOne({ title }).populate('users');
    const user = session.users.find(u => u.name === userName);

    if (!session || !user) {
      return res.status(404).send('Session or user not found');
    }

    // Найдем карты пользователя в сессии
    const playerCardsEntry = session.playerCards.find(pc => pc.playerId.equals(user._id));
    if (!playerCardsEntry) {
      return res.status(404).send('Player cards not found');
    }

    // Проверяем, есть ли такая карта у пользователя
    const cardIndex = playerCardsEntry.cards.findIndex(card => card.id === cardId && card.type === 'money' || card.type === 'action');
    if (cardIndex === -1) {
      return res.status(404).send('Money or Action card not found');
    }

    // Удаляем карту из руки и добавляем в собственность
    const [card] = playerCardsEntry.cards.splice(cardIndex, 1);
    const bankEntry = session.bank.find(entry => entry.playerId.equals(user._id)) || { playerId: user._id, cards: [] };
    bankEntry.cards.push(card);
    if (!session.bank.includes(bankEntry)) {
      session.bank.push(bankEntry);
    }

    await session.save();
    res.json({ message: 'Card moved to bank successfully', bank: bankEntry.cards });
  } catch (error) {
    console.error('Error moving card to bank:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/*----------------------------------------------------------------------------------------*/
//эндпоинт для перемещения карты в собственность игрока
app.post('/sessions/:title/property', async (req, res) => {
  const { title } = req.params;
  const { userName, cardId } = req.body;

  try {
    const session = await GameSession.findOne({ title }).populate('users');
    const user = session.users.find(u => u.name === userName);

    if (!session || !user) {
      return res.status(404).send('Session or user not found');
    }

    // Найдем карты пользователя в сессии
    const playerCardsEntry = session.playerCards.find(pc => pc.playerId.equals(user._id));
    if (!playerCardsEntry) {
      return res.status(404).send('Player cards not found');
    }

    // Проверяем, есть ли такая карта у пользователя
    const cardIndex = playerCardsEntry.cards.findIndex(card => card.id === cardId && card.type === 'property');
    if (cardIndex === -1) {
      return res.status(404).send('Property card not found');
    }

    // Удаляем карту из руки и добавляем в собственность
    const [card] = playerCardsEntry.cards.splice(cardIndex, 1);
    const propertyEntry = session.property.find(entry => entry.playerId.equals(user._id)) || { playerId: user._id, cards: [] };
    propertyEntry.cards.push(card);
    if (!session.property.includes(propertyEntry)) {
      session.property.push(propertyEntry);
    }

    await session.save();
    res.status(200).send('Card moved to property successfully');
  } catch (error) {
    console.error('Error moving card to property:', error);
    res.status(500).send('Server error');
  }
});

/*----------------------------------------------------------------------------------------*/
//Эндпоинт для "взятия" карт из колоды
app.post('/sessions/:title/draw', async (req, res) => {
  const { userName, userId } = req.body;
  const { title } = req.params;

  try {
    const session = await GameSession.findOne({ title }).populate('users');
    if (!session) {
      return res.status(404).send('Session not found');
    }

    const user = await User.findOne({ name: userName });
    if (!user) {
      return res.status(404).send('User not found in session');
    }

    if (session.currentTurn.toString() !== user._id.toString()) {
      return res.status(403).send("It's not your turn");
    }

    // Находим запись карт игрока в сессии
    let playerCardsEntry = session.playerCards.find(entry => entry.playerId.equals(user._id));
    if (!playerCardsEntry) {
      playerCardsEntry = {
        playerId: user._id,
        cards: []
      };
      session.playerCards.push(playerCardsEntry);
    }

    // Проверяем, сколько карт уже есть у игрока
    if (playerCardsEntry.cards.length >= 7) {
      // Если карт 7 или больше, игрок не может взять ещё карты
      return res.status(400).send('You cannot draw more cards. You already have 7 or more cards.');
    }

    // Определяем количество карт для выдачи
    const numberOfCards = 2;

    // Проверяем, сколько карт можно взять, чтобы не превысить лимит в 7 карт
    const cardsToDraw = Math.min(numberOfCards, 7 - playerCardsEntry.cards.length);

    // Извлекаем карты из колоды
    const drawnCards = cards.splice(0, cardsToDraw);

    // Добавляем вытянутые карты к картам игрока
    playerCardsEntry.cards.push(...drawnCards);

    await session.save();
    res.status(200).json({ message: 'Cards drawn successfully', cards: drawnCards });
  } catch (error) {
    console.error('Error drawing cards:', error);
    res.status(500).send('Server error');
  }
});

/*----------------------------------------------------------------------------------------*/
//Эндпоинт для передачи хода следующему игроку
app.post('/sessions/endTurn/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const userId = req.body.userId;

    const session = await GameSession.findOne({ title: title });
    if (!session) {
      return res.status(404).send('Session not found');
    }

    // Проверяем, что действие совершает игрок, чей сейчас ход
    if (session.currentTurn.toString() !== userId) {
      return res.status(403).send("It's not your turn");
    }

    const currentPlayerId = session.currentTurn.toString();
    const playerProperties = session.property.filter(property => property.playerId._id.toString() === currentPlayerId);

    // Считаем количество полных комплектов
    let completeSetsCount = 0;

    playerProperties.forEach(propertyGroup => {
      const { cards } = propertyGroup;
      if (cards.length === 0) return;

      // Группируем карты по цвету
      const cardsByColor = cards.reduce((acc, card) => {
        if (!acc[card.color]) {
          acc[card.color] = [];
        }
        acc[card.color].push(card);
        return acc;
      }, {});

      // Проверяем каждую группу карт на наличие полного комплекта
      Object.values(cardsByColor).forEach(colorGroup => {
        if (colorGroup.length > 0) {
          const setSize = colorGroup[0].setSize;
          if (colorGroup.length >= setSize) {
            completeSetsCount++;
          }
        }
      });
    });

    if (completeSetsCount >= 3) {
      session.status = 'completed';
      session.winner = userId;
      await session.save();
      return res.status(200).send({ message: 'Game Over: Player has collected three complete sets and wins!' });
    }

    // Логика для перехода к следующему игроку
    const currentIndex = session.turnOrder.indexOf(session.currentTurn.toString());
    const nextIndex = (currentIndex + 1) % session.turnOrder.length;
    session.currentTurn = session.turnOrder[nextIndex];

    await session.save();
    res.status(200).send('Turn has been moved to the next player');
  } catch (error) {
    console.error('Error moving turn:', error);
    res.status(500).send(error.message);
  }
});


/*----------------------------------------------------------------------------------------*/
//Эндпоинт для проверки 3 полных собранных комплекта
/*app.get('/sessions/checkFullSet/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const session = await GameSession.findOne({ title }).populate('property.playerId');

    if (!session) {
      return res.status(404).send('Game session not found');
    }

    const currentPlayerId = session.currentTurn.toString();
    const playerProperties = session.property.filter(property => property.playerId._id.toString() === currentPlayerId);

    let completeSetsCount = 0;

    playerProperties.forEach(propertyGroup => {
      const { cards } = propertyGroup;
      if (cards.length === 0) return;

      const cardsByColor = cards.reduce((acc, card) => {
        if (!acc[card.color]) {
          acc[card.color] = [];
        }
        acc[card.color].push(card);
        return acc;
      }, {});

      Object.values(cardsByColor).forEach(colorGroup => {
        if (colorGroup.length > 0) {
          const setSize = colorGroup[0].setSize;
          if (colorGroup.length >= setSize) {
            completeSetsCount++;
          }
        }
      });
    });

    if (completeSetsCount >= 3) {
      session.status = 'completed';
      session.winner = currentPlayerId;
      session.save();
      res.send({ success: true, message: 'Player has completed at least three sets.' });
    } else {
      res.send({ success: false, message: `Player has only completed ${completeSetsCount} set(s).` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});*/

app.post('/sessions/:title/playBirthday', async (req, res) => {
  const { title } = req.params;
  const { userId } = req.body;

  try {
    const session = await GameSession.findOne({ title }).populate({
      path: 'playerCards.playerId',
      match: { 'playerCards.playerId': { $ne: userId } }  // Исключаем карты текущего пользователя
    });

    if (!session) {
      return res.status(404).send('Session not found');
    }

    // Находим карты на руках пользователя
    const userCards = session.playerCards.find(entry => entry.playerId.toString() === userId);
    if (!userCards || !userCards.cards) {
      return res.status(404).send('User cards not found or user has no cards');
    }

    // Проверяем, что у пользователя есть карта "День рождения"
    const birthdayCardIndex = userCards.cards.findIndex(card => card.name === "Birthday" && card.type === 'action');
    if (birthdayCardIndex === -1) {
      return res.status(400).send('No Birthday card available');
    }

    // Удаляем карту "День рождения" из карт пользователя
    userCards.cards.splice(birthdayCardIndex, 1);

    // Перебираем банк каждого игрока
    session.bank.forEach(bank => {
      if (!bank.cards) {
        console.error(`Bank for player ${bank.playerId} has no cards`);
        return;
      }

      if (bank.playerId.equals(userId)) return; // Пропускаем банк текущего пользователя

      const paymentCard = bank.cards
          .filter(card => (card.type === 'money' || card.type === 'action') && card.value >= 2)
          .sort((a, b) => a.value - b.value)[0]; // Выбираем наименьшую подходящую карту

      if (paymentCard) {
        // Перемещаем найденную карту в банк пользователя
        const userBank = session.bank.find(entry => entry.playerId.equals(userId));
        if (!userBank || !userBank.cards) {
          console.error(`No bank found for user ${userId} or bank has no cards`);
          return;
        }
        userBank.cards.push(paymentCard);
        // Удаляем карту из банка платящего игрока
        const index = bank.cards.indexOf(paymentCard);
        bank.cards.splice(index, 1);
      }
    });

    await session.save();
    res.status(200).send({ message: 'Birthday card played successfully', bank: session.bank });
  } catch (error) {
    console.error('Error processing Birthday card:', error);
    res.status(500).send('Internal server error: ' + error.message);
  }
});
