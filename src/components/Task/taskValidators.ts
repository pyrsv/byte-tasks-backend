import Joi from 'joi';

export const createTaskValidator = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
});

export const updateTaskValidator = Joi.object().keys({
  timeTracked: Joi.number(),
  isActive: Joi.boolean(),
  isFinished: Joi.boolean(),
});
