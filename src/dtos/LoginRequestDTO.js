import * as yup from 'yup';

import validateSchema from '../validation/schemaValidation';

class LoginRequestDTO {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;

    this.schema = yup.object().shape({
      email: yup.string().required('Required field').email('Field must have an email format'),
      password: yup.string().required('Required field').max(150, 'Maximum of 150 characters'),
    });
  }

  async validate() {
    await validateSchema(
      this.schema,
      { email: this.email, password: this.password },
    );
  }
}

export default LoginRequestDTO;
