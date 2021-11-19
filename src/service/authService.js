import { generateHash, compareHash } from '../utils/bcrypt';
import { generateLoginToken } from '../utils/jwt';
import UserExistsException from '../exceptions/UserExistsException';
import InvalidCredentialsException from '../exceptions/InvalidCredentialsException';

class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async register(body) {
    await body.validate();

    const foundUser = await this.authRepository.findUserByEmail(body.email);

    if (foundUser) {
      throw new UserExistsException();
    }

    const encryptedPassword = generateHash(body.password, 10);

    const newUser = { ...body, password: encryptedPassword };

    const savedUser = await this.authRepository.saveUser(newUser);

    return {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async login(body) {
    await body.validate();

    const foundUser = await this.authRepository.findUserByEmail(body.email);

    if (!foundUser) {
      throw new InvalidCredentialsException();
    }

    const isPasswordMatch = compareHash(body.password, foundUser.password);

    if (!isPasswordMatch) {
      throw new InvalidCredentialsException();
    }

    const token = generateLoginToken({
      id: foundUser._id,
      role: foundUser.role,
    });

    return {
      token,
      role: foundUser.role,
    };
  }
}

export default AuthService;
