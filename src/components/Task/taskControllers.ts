import { RequestHandler } from 'express';
import { ITask } from './types';

export const createTaskController: RequestHandler<ITask> = async (
  req, res, next,
) => {
  try {
    void await Promise.resolve();

    // const { user: { email } } = req;
  } catch (err) {
    next(err);
  }
};
