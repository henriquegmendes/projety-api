import { Router } from 'express';

import Project from '../models/Project';
import Task from '../models/Task';

import CreateProjectRequestDTO from '../dtos/CreateProjectRequestDTO';
import EditProjectRequestDTO from '../dtos/EditProjectRequestDTO';

import ProjectNotFoundException from '../exceptions/ProjectNotFoundException';

import validateId from '../validation/mongooseIdValidation';

const router = Router();

const validateProjectExists = async (projectId, ownerId) => {
  const project = await Project.findOne({ _id: projectId, owner: ownerId });

  if (!project) {
    throw new ProjectNotFoundException();
  }
};

router.get('/', async (req, res, next) => {
  try {
    const { title = '' } = req.query;
    const { id } = req.user;

    const titleRegex = new RegExp(title, 'i');

    const projects = await Project.find({ owner: id, title: { $regex: titleRegex } });

    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { id } = req.user;

    validateId(projectId);

    const project = await Project.findOne({ _id: projectId, owner: id }).populate('tasks');

    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.user;

    const bodySchema = new CreateProjectRequestDTO(body);
    await bodySchema.validate();

    const projectWithOwner = { ...body, owner: id };

    const newProject = await Project.create(projectWithOwner);

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

router.put('/:projectId', async (req, res, next) => {
  try {
    const { body } = req;
    const { projectId } = req.params;
    const { id } = req.user;

    validateId(projectId);

    const bodySchema = new EditProjectRequestDTO(body);
    await bodySchema.validate();

    await validateProjectExists(projectId, id);

    const editedProject = await Project.findByIdAndUpdate(projectId, body, { new: true });

    res.json(editedProject);
  } catch (error) {
    next(error);
  }
});

router.delete('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { id } = req.user;

    validateId(projectId);

    await validateProjectExists(projectId, id);

    await Project.findByIdAndDelete(projectId);
    await Task.deleteMany({ project: projectId });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

export default router;
