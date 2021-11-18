import { Router } from 'express';

import * as yup from 'yup';
import { generateHash } from '../utils/bcrypt';

import User from '../models/User';
import UserExistsException from '../exceptions/UserExistsException';

import RegisterRequestDTO from '../dtos/RegisterRequestDTO';

const router = Router();

// DTO --- Data Transfer Object

router.post('/register', async (req, res, next) => {
  try {
    const body = new RegisterRequestDTO(req.body);
    await body.validate();

    const foundUser = await User.findOne({ email: body.email });

    if (foundUser) {
      throw new UserExistsException();
    }

    const encryptedPassword = generateHash(body.password, 10);

    const newUser = { ...body, password: encryptedPassword };

    const savedUser = await User.create(newUser);

    const response = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
});

export default router;
