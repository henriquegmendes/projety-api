class ProjectNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'Project not found to be updated';
    this.status = 400;
  }
}

export default ProjectNotFoundException;
