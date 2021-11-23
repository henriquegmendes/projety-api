class ProjectsRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async findAllByTitleAndOwnerId(title, id) {
    const titleRegex = new RegExp(title, 'i');

    const projects = await this.Model.find({
      owner: id,
      title: { $regex: titleRegex },
    });

    return projects;
  }

  async create(projectData) {
    const newProject = await this.Model.create(projectData);

    return newProject;
  }

  async findOneByIdAndOwnerId(id, ownerId) {
    const project = await this.Model.findOne({
      _id: id,
      owner: ownerId,
    });

    return project;
  }

  async updateProjectById(id, projectData) {
    const editedProject = await this.Model.findByIdAndUpdate(
      id,
      projectData,
      { new: true },
    );

    return editedProject;
  }

  async deleteOneById(id) {
    await this.Model.findByIdAndDelete(id);
  }

  async insertTaskIdIntoProject(projectId, taskId) {
    await this.Model.findByIdAndUpdate(projectId, { $push: { tasks: taskId } });
  }

  async removeTaskIdFromProject(projectId, taskId) {
    await this.Model.findByIdAndUpdate(projectId, { $pull: { tasks: taskId } });
  }
}

export default ProjectsRepository;
