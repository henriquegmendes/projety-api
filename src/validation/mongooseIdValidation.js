import { isValidObjectId } from 'mongoose';

import InvalidIdException from '../exceptions/InvalidIdException';

const validateId = (id) => {
  const isValid = isValidObjectId(id);

  if (!isValid) {
    throw new InvalidIdException();
  }
};

export default validateId;
