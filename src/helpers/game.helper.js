// Check for a winner in the board state
export const checkWinner = (boardState) => {
  const winningCombinations = [
    // Horizontal
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Vertical
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonal
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      boardState[a[0]][a[1]] !== ' ' &&
      boardState[a[0]][a[1]] === boardState[b[0]][b[1]] &&
      boardState[a[0]][a[1]] === boardState[c[0]][c[1]]
    ) {
      return true; // A winner exists
    }
  }

  return false; // No winner
};

// Update player stats based on game result
export const updatePlayerStats = async (winnerId, players) => {
  const User = (await import('../models/user.model.js')).default;

  for (const playerId of players) {
    const update = winnerId
      ? {
          $inc: playerId === winnerId ? { wins: 1 } : { losses: 1 },
        }
      : { $inc: { draws: 1 } }; // If it's a draw

    await User.findByIdAndUpdate(playerId, update);
  }
};
