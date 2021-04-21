import Joi from 'joi';

export const registerValidationSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const loginValidationSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
