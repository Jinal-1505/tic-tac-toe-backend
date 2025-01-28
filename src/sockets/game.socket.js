import GameSession from '../models/gameSession.model.js';
import GameRoom from '../models/gameRoom.model.js';
import { checkWinner, updatePlayerStats } from '../helpers/game.helper.js';

export const gameSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', async ({ roomId, userId, joinCode }) => {
      const room = await GameRoom.findById(roomId);

      if (!room) {
        socket.emit('roomNotFound', { message: 'Room not found.' });
        return;
      }
      if (room.isPrivate && room.joinCode !== joinCode) {
        socket.emit('invalidJoinCode', { message: 'Invalid join code.' });
        return;
      }

      if (room.players.includes(userId)) {
        socket.emit('playerAlreadyInRoom', { message: 'You are already in this room.' });
        return;
      }

      if (room.players.length < 2) {
        room.players.push(userId);

        if (room.players.length === 2) {
          const gameSession = new GameSession({
            roomId,
            players: room.players,
            currentTurn: room.players[0],
            boardState: [
              [' ', ' ', ' '],
              [' ', ' ', ' '],
              [' ', ' ', ' '],
            ],
            gameStatus: 'ONGOING',
          });

          // Save the game session to the database
          await gameSession.save();
          await GameSession.create(gameSession);

          room.status = 'ONGOING';
          await room.save();

          // Emit the game start event
          io.to(roomId).emit('gameStart', { message: 'Game started!', room });
        }

        await room.save();

        socket.join(roomId);
      } else {
        socket.emit('roomFull', { message: 'The room is already full.' });
      }
    });

    // Make Move
    socket.on('makeMove', async ({ roomId, userId, row, col }) => {
      const game = await GameSession.findOne({ roomId });

      if (!game) {
        socket.emit('error', { message: 'Game not found!' });
        return;
      }

      if (String(game.currentTurn) !== userId) {
        socket.emit('invalidMove', { message: 'It is not your turn!' });
        return;
      }

      if (game.boardState[row][col] !== ' ') {
        socket.emit('invalidMove', { message: 'Cell already occupied!' });
        return;
      }

      const playerSymbol = game.players[0].toString() === userId ? 'X' : 'O';
      game.boardState[row][col] = playerSymbol;

      const winner = checkWinner(game.boardState);
      if (winner) {
        game.gameStatus = 'WIN';
        game.winner = userId;
        await updatePlayerStats(userId, game.players);
        await game.save();

        io.to(roomId).emit('gameEnd', { winner: userId, gameStatus: 'WIN' });
        return;
      }

      const isDraw = game.boardState.flat().every((cell) => cell !== ' ');
      if (isDraw) {
        game.gameStatus = 'DRAW';
        await updatePlayerStats(null, game.players);
        await game.save();

        io.to(roomId).emit('gameEnd', { gameStatus: 'DRAW' });
        return;
      }

      game.currentTurn = game.players.find((player) => player !== userId);
      game.gameStatus = 'ONGOING';
      await game.save();

      io.to(roomId).emit('moveMade', {
        boardState: game.boardState,
        currentTurn: game.currentTurn,
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
