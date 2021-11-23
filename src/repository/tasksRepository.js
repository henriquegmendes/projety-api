class TasksRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async deleteAllByProjectId(projectId) {
    await this.Model.deleteMany({ project: projectId });
  }
}

export default TasksRepository;
