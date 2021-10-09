import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

export const validationMiddleware = (schema: Joi.Schema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { body } = req;

    try {
      await schema.validateAsync(body, {
        abortEarly: false,
      });

      next();
    } catch (err) {
      res.status(400).json(err);
    }
  };
