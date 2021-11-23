import validateId from '../validation/mongooseIdValidation';
import TaskNotFoundException from '../exceptions/TaskNotFoundException';

class TasksService {
  constructor(tasksRepository, projectsService) {
    this.tasksRepository = tasksRepository;
    this.projectsService = projectsService;
  }

  async findAllByProjectId(projectId, ownerId) {
    validateId(projectId);

    await this.projectsService.validateProjectExists(projectId, ownerId);

    const tasks = await this.tasksRepository.findAllByProjectId(projectId);

    return tasks;
  }

  async create(projectId, ownerId, body) {
    await body.validate();
    validateId(projectId);

    await this.projectsService.validateProjectExists(projectId, ownerId);

    const taskData = {
      title: body.title,
      description: body.description,
      project: projectId,
    };

    const newTask = await this.tasksRepository.create(taskData);

    await this.projectsService.insertTaskIdIntoProject(projectId, newTask._id);

    return newTask;
  }

  async updateOne(taskId, ownerId, body) {
    await body.validate();
    validateId(taskId);

    await this.findTaskAndValidateProjectOwner(taskId, ownerId);

    const taskData = {
      title: body.title,
      description: body.description,
    };

    const editedTask = await this.tasksRepository.updateTaskById(taskId, taskData);

    return editedTask;
  }

  async deleteOne(taskId, ownerId) {
    validateId(taskId);

    const task = await this.findTaskAndValidateProjectOwner(taskId, ownerId);

    await this.tasksRepository.deleteOne(taskId);

    await this.projectsService.removeTaskIdFromProject(task.project, taskId);
  }

  async findTaskAndValidateProjectOwner(taskId, ownerId) {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFoundException();
    }

    await this.projectsService.validateProjectExists(task.project, ownerId);

    return task;
  }
}

export default TasksService;
