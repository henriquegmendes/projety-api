class UserExistsException extends Error {
  constructor() {
    super();
    this.message = 'Email has already being taken by another user. Please choose another';
    this.status = 400;
  }
}

export default UserExistsException;
