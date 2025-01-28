import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameRoom',
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  boardState: {
    type: [[String]],
    default: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
  },
  currentTurn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameStatus: {
    type: String,
    enum: ['ONGOING', 'DRAW', 'WIN'],
    default: 'ONGOING',
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

const GameSession = mongoose.model('GameSessions', GameSchema);
export default GameSession;
