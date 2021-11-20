import { Router } from 'express';

import authController from './controllers/authController';
import projectsController from './controllers/projectsController';
import tasksController from './controllers/tasksController';

import protectedRouteMiddleware from './middlewares/protectedRoute';

const router = Router();

router.use('/auth', authController);

router.use(protectedRouteMiddleware);

router.use('/projects', projectsController);
router.use('/tasks', tasksController);

export default router;
