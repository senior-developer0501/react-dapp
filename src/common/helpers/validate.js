import { celebrate, Joi } from 'celebrate';

import web3 from '~/common/services/web3';

const filesBaseValidation = {
  id: Joi.number(),
  url: Joi.string()
    .uri()
    .required(),
};

export const filesValidation = Joi.array().items(
  Joi.object({
    ...filesBaseValidation,
  }),
);

export const imagesValidation = Joi.array().items(
  Joi.object({
    ...filesBaseValidation,
    urlThreshold: Joi.string()
      .uri()
      .required(),
    urlThresholdThumb: Joi.string()
      .uri()
      .required(),
    urlThumb: Joi.string()
      .uri()
      .required(),
  }),
);

export const web3Validators = Joi.extend(joi => {
  return {
    type: 'web3',
    base: joi.string(),
    messages: {
      'web3.address': 'is invalid Ethereum address',
      'web3.addressChecksum': 'is invalid Ethereum address checksum',
    },
    rules: {
      address: {
        validate(value, helpers) {
          if (!value || !web3.utils.isAddress(value)) {
            return helpers.error('web3.address');
          }

          return value;
        },
      },
      addressChecksum: {
        validate(value, helpers) {
          if (!value || !web3.utils.checkAddressChecksum(value)) {
            return helpers.error('web3.addressChecksum');
          }

          return value;
        },
      },
    },
  };
});

export default function validate(schema) {
  const joiOptions = {
    abortEarly: false,
    debug: process.env.NODE_ENV !== 'production',
  };

  return celebrate(schema, joiOptions);
}
