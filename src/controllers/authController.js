import { Router } from 'express';

import RegisterRequestDTO from '../dtos/RegisterRequestDTO';
import LoginRequestDTO from '../dtos/LoginRequestDTO';

import User from '../models/User';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';

// Injeção de Dependências (Dependency Injection)
const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);

const router = Router();

// DTO --- Data Transfer Object

router.post('/register', async (req, res, next) => {
  try {
    const body = new RegisterRequestDTO(req.body);

    const userResponse = await authService.register(body);

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const body = new LoginRequestDTO(req.body);

    const loginResponse = await authService.login(body);

    res.status(200).json(loginResponse);
  } catch (error) {
    next(error);
  }
});

export default router;
