import GameRoom from '../models/gameRoom.model.js';

/**
 * Create Game Room API
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createGameRoom = async (req, res) => {
  try {
    const { roomName, isPrivate } = req.body;

    //Generate joinCode if the room is private (true)
    let joinCode = '';
    if (isPrivate) {
      joinCode = Math.random().toString(36).slice(2, 6);
    }

    const roomNameExist = await GameRoom.findOne({ roomName });

    if (roomNameExist) {
      return res.status(400).json({ message: 'Room Name Already Exist' });
    }

    const newGameRoom = {
      roomName: roomName,
      createdBy: req.user._id,
      isPrivate: isPrivate,
      joinCode: joinCode,
    };

    await GameRoom.create(newGameRoom);

    res.status(200).json({
      message: 'New Room Created successfully',
      newGameRoom,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Join Game Room API
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const joinGameRoom = async (req, res) => {
  try {
    const { roomId, joinCode } = req.body;

    const roomDetail = await GameRoom.findOne({ _id: roomId });
    if (!roomDetail) {
      return res.status(400).json({ message: 'Room Not Found' });
    }

    if (roomDetail.isPrivate && roomDetail.joinCode !== joinCode) {
      return res.status(400).json({ message: 'Invalid Join Code' });
    }

    roomDetail.players.push(req.user._id);
    await GameRoom.create();

    res.status(200).json({
      message: 'Room Joined successfully',
      roomDetail,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get Public Room List API
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const listActiveRoom = async (req, res) => {
  try {
    const rooms = await GameRoom.find({ isPrivate: false });

    res.status(200).json({
      message: 'Fetched Public Room List successfully',
      rooms,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
