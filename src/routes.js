import { Router } from 'express';

import authController from './controllers/authController';
import projectsController from './controllers/projectsController';
import tasksController from './controllers/tasksController';

const router = Router();

router.use('/auth', authController);
router.use('/projects', projectsController);
router.use('/tasks', tasksController);

export default router;
