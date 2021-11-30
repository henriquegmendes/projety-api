import { Router } from 'express';

import Task from '../models/Task';
import Project from '../models/Project';

import CreateTaskRequestDTO from '../dtos/CreateTaskRequestDTO';
import EditTaskRequestDTO from '../dtos/EditTaskRequestDTO';

import TaskNotFoundException from '../exceptions/TaskNotFoundException';
import ProjectNotFoundException from '../exceptions/ProjectNotFoundException';

import validateId from '../validation/mongooseIdValidation';

const router = Router();

const validateProjectExists = async (projectId, ownerId) => {
  const project = await Project.findOne({ _id: projectId, owner: ownerId });

  if (!project) {
    throw new ProjectNotFoundException();
  }
};

const validateTaskExists = async (taskId, ownerId) => {
  const task = await Task.findById(taskId).populate('project');

  if (!task || task.project.owner.toString() !== ownerId) {
    throw new TaskNotFoundException();
  }

  return task;
};

router.get('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { id } = req.user;

    validateId(projectId);

    await validateProjectExists(projectId, id);

    const tasks = await Task.find({ project: projectId });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post('/:projectId', async (req, res, next) => {
  try {
    const { body } = req;
    const { projectId } = req.params;
    const { id } = req.user;

    validateId(projectId);

    const bodySchema = new CreateTaskRequestDTO(body);
    await bodySchema.validate();

    const project = await Project.findOne({ _id: projectId, owner: id });

    if (!project) {
      throw new ProjectNotFoundException();
    }

    const taskObj = { ...body, project: projectId };

    const newTask = await Task.create(taskObj);
    await Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put('/:taskId', async (req, res, next) => {
  try {
    const { body } = req;
    const { taskId } = req.params;
    const { id } = req.user;

    validateId(taskId);

    const bodySchema = new EditTaskRequestDTO(body);
    await bodySchema.validate();

    await validateTaskExists(taskId, id);

    const editedTask = await Task.findByIdAndUpdate(taskId, body, { new: true });

    res.json(editedTask);
  } catch (error) {
    next(error);
  }
});

router.delete('/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { id } = req.user;

    validateId(taskId);

    const task = await validateTaskExists(taskId, id);

    await Task.findByIdAndDelete(taskId);
    await Project.findByIdAndUpdate(task.project._id, { $pull: { tasks: taskId } });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

export default router;
