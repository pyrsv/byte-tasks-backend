import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validationMiddleware = (schema: Joi.Schema) => { 
  return async (req: Request, res: Response, next: NextFunction) => { 
  const { body } = req;
  
    try {
      const validationResult = await schema.validateAsync(body)
      next()
    } catch(err) {
      res.status(400).json(err)
    }
  }
};