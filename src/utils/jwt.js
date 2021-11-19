import jwt from 'jsonwebtoken';

export const generateLoginToken = (payload) => (
  jwt.sign(
    payload,
    process.env.LOGIN_TOKEN_SECRET,
    { expiresIn: process.env.LOGIN_TOKEN_EXPIRATION },
  )
);
