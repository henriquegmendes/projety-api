class AuthRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async findUserByEmail(email) {
    const foundUser = await this.Model.findOne({ email });

    return foundUser;
  }

  async saveUser(newUser) {
    const savedUser = await this.Model.create(newUser);

    return savedUser;
  }
}

export default AuthRepository;
