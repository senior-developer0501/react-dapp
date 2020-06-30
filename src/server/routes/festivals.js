import express from 'express';

import validate from '~/common/helpers/validate';

import Festival from '~/server/models/festival';
import authMiddleware from '~/server/middlewares/passport';
import festivalsController from '~/server/controllers/festivals';
import festivalsValidation from '~/server/validations/festivals';
import resourcesMiddleware from '~/server/middlewares/resources';

const router = express.Router();

const getFestivalResource = resourcesMiddleware({
  model: Festival,
});

router.put(
  '/',
  authMiddleware,
  validate(festivalsValidation.create),
  festivalsController.create,
);

router.get(
  '/',
  validate(festivalsValidation.readAll),
  festivalsController.readAll,
);

router.get(
  '/:slug',
  validate(festivalsValidation.read),
  getFestivalResource,
  festivalsController.read,
);

router.post(
  '/:slug',
  authMiddleware,
  validate(festivalsValidation.update),
  getFestivalResource,
  festivalsController.update,
);

router.delete(
  '/:slug',
  authMiddleware,
  validate(festivalsValidation.destroy),
  getFestivalResource,
  festivalsController.destroy,
);

export default router;