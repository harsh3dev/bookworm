import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const signToken = (user) => {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
