import { Joi, Segments } from 'celebrate';

import { slugValidation, paginationValidation } from '~/server/validations';
import { imagesValidation } from '~/common/helpers/validate';

const defaultValidation = {
  name: Joi.string().max(128).required(),
  bio: Joi.string().max(2000).required(),
  consentToDataReveal: Joi.boolean(),
  images: imagesValidation.max(2),
  artworks: Joi.array().max(10),
};

export default {
  create: {
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
  readAll: {
    [Segments.PARAMS]: {
      ...paginationValidation,
      orderKey: Joi.string().valid('id', 'createdAt', 'updatedAt', 'title'),
    },
  },
  read: {
    [Segments.PARAMS]: {
      ...slugValidation,
    },
  },
  update: {
    [Segments.PARAMS]: {
      ...slugValidation,
    },
    [Segments.BODY]: {
      ...defaultValidation,
    },
  },
  destroy: {
    [Segments.PARAMS]: {
      ...slugValidation,
    },
  },
};