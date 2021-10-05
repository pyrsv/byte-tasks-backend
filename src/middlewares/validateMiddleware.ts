import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

export const validationMiddleware = (schema: Joi.Schema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { body } = req;

    try {
      const validationResult = await schema.validateAsync(body);
      void validationResult;

      next();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err in validationMiddleware', err);
      res.status(400).json(err);
    }
  };
