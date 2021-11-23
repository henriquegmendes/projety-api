class ProjectNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'Project not found';
    this.status = 400;
  }
}

export default ProjectNotFoundException;
