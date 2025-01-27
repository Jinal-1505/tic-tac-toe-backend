import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const ValidateUser = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findOne({ email: decoded.email });

        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
