const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    maxPlayers: {
        type: Number,
        required: true,
        min: 2,
        max: 5
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    status: {
        type: String,
        required: true,
        enum: ['active', 'waiting', 'completed'], // перечисление возможных статусов сессии
        default: 'waiting',
    },
    playerCards: [{
        playerId: mongoose.Schema.Types.ObjectId,
        cards: [Object] // Массив объектов карт
    }],
    bank: [{
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        cards: [Object], // Массив объектов карт, помещенных в банк
    }],
    property: [{ //поле для хранения собственности
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        cards: [Object] // Массив объектов карт с типом property
    }],
    currentTurn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    turnOrder: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
}, { timestamps: true });

const GameSession = mongoose.model('GameSession', gameSessionSchema);

module.exports = GameSession;
