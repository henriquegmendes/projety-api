class InvalidIdException extends Error {
  constructor() {
    super();
    this.message = 'Invalid Id informed';
    this.status = 400;
  }
}

export default InvalidIdException;
