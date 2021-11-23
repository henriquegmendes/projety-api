class TasksRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async deleteAllByProjectId(projectId) {
    await this.Model.deleteMany({ project: projectId });
  }

  async findAllByProjectId(projectId) {
    const tasks = await this.Model.find({ project: projectId });

    return tasks;
  }

  async create(taskData) {
    const newTask = await this.Model.create(taskData);

    return newTask;
  }

  async findById(id) {
    const task = await this.Model.findById(id);

    return task;
  }

  async updateTaskById(id, taskData) {
    const editedTask = await this.Model.findByIdAndUpdate(
      id,
      taskData,
      { new: true },
    );

    return editedTask;
  }

  async deleteOne(id) {
    await this.Model.findByIdAndDelete(id);
  }
}

export default TasksRepository;
