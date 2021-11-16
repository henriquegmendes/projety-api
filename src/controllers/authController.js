import { Router } from 'express';

import * as yup from 'yup';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';
import UserExistsException from '../exceptions/UserExistsException';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().required('Required field').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
      email: yup.string().required('Required field').email('Field must have an email format'),
      password: yup.string().required('required field').min(6, 'Minimum of 6 characters').max(150, 'Maximum of 150 characters'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      const errors = error.inner.map((err) => ({
        field: err.path,
        error: err.errors[0],
      }));

      throw new InvalidBodyRequestException(errors);
    }

    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
      throw new UserExistsException();
    }

    const encryptedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    const newUser = { ...req.body, password: encryptedPassword };

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

router.post('/login', (req, res, next) => {
  try {
    console.log(req.body);

    throw new Error();

    res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
});

export default router;
