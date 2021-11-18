import bcrypt from 'bcryptjs';

export const generateHash = (textPassword, saltRounds) => (
  bcrypt.hashSync(textPassword, bcrypt.genSaltSync(saltRounds))
);

export const compareHash = (textPassword, hashPassword) => (
  bcrypt.compareSync(textPassword, hashPassword)
);
