import { Router } from 'express';

import CreateTaskRequestDTO from '../dtos/CreateTaskRequestDTO';
import EditTaskRequestDTO from '../dtos/EditTaskRequestDTO';

import Task from '../models/Task';
import Project from '../models/Project';
import TasksService from '../service/tasksService';
import ProjectsService from '../service/projectsService';
import TasksRepository from '../repository/tasksRepository';
import ProjectsRepository from '../repository/projectsRepository';

const tasksRepository = new TasksRepository(Task);
const projectsRepository = new ProjectsRepository(Project);
const projectsService = new ProjectsService(projectsRepository, tasksRepository);
const tasksService = new TasksService(tasksRepository, projectsService);

const router = Router();

router.get('/:projectId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { projectId } = req.params;

    const tasks = await tasksService.findAllByProjectId(projectId, id);

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post('/:projectId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { projectId } = req.params;
    const body = new CreateTaskRequestDTO(req.body);

    const newTask = await tasksService.create(projectId, id, body);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put('/:taskId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { taskId } = req.params;
    const body = new EditTaskRequestDTO(req.body);

    const editedTask = await tasksService.updateOne(taskId, id, body);

    res.status(200).json(editedTask);
  } catch (error) {
    next(error);
  }
});

router.delete('/:taskId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { taskId } = req.params;

    await tasksService.deleteOne(taskId, id);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

export default router;
