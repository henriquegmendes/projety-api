import * as yup from 'yup';

import validateSchema from '../validation/schemaValidation';

class EditProjectRequestDTO {
  constructor({ title, description }) {
    this.title = title;
    this.description = description;

    this.schema = yup.object().shape({
      title: yup.string().required('Required field').min(6, 'Minimum of 6 characters').max(150, 'Maximum of 150 characters'),
      description: yup.string().max(150, 'Maximum of 150 characters'),
    });
  }

  async validate() {
    await validateSchema(
      this.schema,
      { title: this.title, description: this.description },
    );
  }
}

export default EditProjectRequestDTO;
