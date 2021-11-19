import * as yup from 'yup';

import validateSchema from '../validation/schemaValidation';

class RegisterRequestDTO {
  constructor({ name, email, password }) {
    this.name = name;
    this.email = email;
    this.password = password;

    this.schema = yup.object().shape({
      name: yup.string().required('Required field').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
      email: yup.string().required('Required field').email('Field must have an email format'),
      password: yup.string().required('Required field').min(6, 'Minimum of 6 characters').max(150, 'Maximum of 150 characters'),
    });
  }

  async validate() {
    await validateSchema(
      this.schema,
      { name: this.name, email: this.email, password: this.password },
    );
  }
}

export default RegisterRequestDTO;
