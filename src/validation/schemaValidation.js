import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';

const validateSchema = async (schema, body) => {
  try {
    await schema.validate(body, { abortEarly: false });
  } catch (error) {
    const errors = error.inner.map((err) => ({
      field: err.path,
      error: err.errors[0],
    }));

    throw new InvalidBodyRequestException(errors);
  }
};

export default validateSchema;
