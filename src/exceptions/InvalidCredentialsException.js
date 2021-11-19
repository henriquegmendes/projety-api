class InvalidCredentialsException extends Error {
  constructor() {
    super();
    this.message = 'Invalid email or password credentials';
    this.status = 400;
  }
}

export default InvalidCredentialsException;
