import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevent access from client-side JavaScript
    sameSite: 'strict', // Prevent CSRF attacks
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
  });

  return token;
};
