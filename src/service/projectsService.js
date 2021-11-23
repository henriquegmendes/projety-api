import validateId from '../validation/mongooseIdValidation';
import ProjectNotFoundException from '../exceptions/ProjectNotFoundException';

class ProjectsService {
  constructor(projectsRepository, tasksRepository) {
    this.projectsRepository = projectsRepository;
    this.tasksRepository = tasksRepository;
  }

  async findAllByTitleAndOwnerId(title = '', id) {
    const projects = await this.projectsRepository.findAllByTitleAndOwnerId(title, id);

    return projects;
  }

  async create(body, id) {
    await body.validate();

    const projectData = {
      title: body.title,
      description: body.description,
      owner: id,
    };

    const newProject = await this.projectsRepository.create(projectData);

    return newProject;
  }

  async findOneByIdAndOwnerId(id, ownerId) {
    validateId(id);

    const project = await this.projectsRepository.findOneByIdAndOwnerId(id, ownerId);

    return project;
  }

  async updateOne(id, ownerId, body) {
    await body.validate();
    validateId(id);

    await this.validateProjectExists(id, ownerId);

    const projectData = {
      title: body.title,
      description: body.description,
    };

    const editedProject = await this.projectsRepository.updateProjectById(id, projectData);

    return editedProject;
  }

  async deleteOne(id, ownerId) {
    validateId(id);

    await this.validateProjectExists(id, ownerId);

    await this.projectsRepository.deleteOneById(id);

    await this.tasksRepository.deleteAllByProjectId(id);
  }

  async validateProjectExists(id, ownerId) {
    const project = await this.projectsRepository.findOneByIdAndOwnerId(id, ownerId);

    if (!project) {
      throw new ProjectNotFoundException();
    }
  }

  async insertTaskIdIntoProject(projectId, taskId) {
    await this.projectsRepository.insertTaskIdIntoProject(projectId, taskId);
  }

  async removeTaskIdFromProject(projectId, taskId) {
    await this.projectsRepository.removeTaskIdFromProject(projectId, taskId);
  }
}

export default ProjectsService;
