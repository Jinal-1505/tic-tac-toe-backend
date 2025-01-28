import mongoose from 'mongoose';

const GameRoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  joinCode: {
    type: String,
    unique: true,
  }, // if private room then generate joinCode
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  spectators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const GameRoom = mongoose.model('GameRoom', GameRoomSchema);
export default GameRoom;
