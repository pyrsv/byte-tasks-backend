import Joi from 'joi';

export const createTaskValidator = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  timeTracked: Joi.number().required(),
  isActive: Joi.boolean().required(),
});
