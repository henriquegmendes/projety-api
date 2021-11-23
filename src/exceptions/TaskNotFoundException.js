class TaskNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'Task not found';
    this.status = 400;
  }
}

export default TaskNotFoundException;
