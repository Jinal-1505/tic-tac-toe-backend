import User from '../models/user.model.js';

/**
 * get top 10 players
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getLeaderBoard = async (req, res) => {
  try {
    const topPlayers = await User.find().sort({ wins: -1 }).limit(10);
    res.status(200).json({ topPlayers });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
