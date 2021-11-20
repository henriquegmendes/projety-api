class NotAuthorizedException extends Error {
  constructor(message) {
    super();

    this.message = message;
    this.status = 401;
  }
}

export default NotAuthorizedException;
