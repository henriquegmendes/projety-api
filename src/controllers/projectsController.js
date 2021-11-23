import { Router } from 'express';

import CreateProjectRequestDTO from '../dtos/CreateProjectRequestDTO';
import EditProjectRequestDTO from '../dtos/EditProjectRequestDTO';

import Project from '../models/Project';
import Task from '../models/Task';
import ProjectsService from '../service/projectsService';
import ProjectsRepository from '../repository/projectsRepository';
import TasksRepository from '../repository/tasksRepository'

const projectsRepository = new ProjectsRepository(Project);
const tasksRepository = new TasksRepository(Task);
const projectsService = new ProjectsService(projectsRepository, tasksRepository);

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { title } = req.query;
    const { id } = req.user;
    
    const projects = await projectsService.findAllByTitleAndOwnerId(title, id);

    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get('/:projectId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { projectId } = req.params;

    const project = await projectsService.findOneByIdAndOwnerId(projectId, id)

    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { id } = req.user;
    const body = new CreateProjectRequestDTO(req.body);

    const newProject = await projectsService.create(body, id);

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

router.put('/:projectId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { projectId } = req.params;
    const body = new EditProjectRequestDTO(req.body);

    const editedProject = await projectsService.updateOne(projectId, id, body);

    res.json(editedProject);
  } catch (error) {
    next(error);
  }
});

router.delete('/:projectId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { projectId } = req.params;

    await projectsService.deleteOne(projectId, id)

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

export default router;
