import { Router } from 'express';
import passport from 'passport';
import { validationMiddleware } from '../../middlewares/validateMiddleware';
import {
  createTaskController,
  getTasksCollectionController,
  getTaskController,
  editTaskController,
  deleteTaskContoller,
} from './taskControllers';
import { createTaskValidator, updateTaskValidator } from './taskValidators';

const router = Router();

router.post(
  '/',
  validationMiddleware(createTaskValidator),
  passport.authenticate('jwt', { session: false }),
  createTaskController,
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getTasksCollectionController,
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  getTaskController,
);

router.patch(
  '/:id',
  validationMiddleware(updateTaskValidator),
  passport.authenticate('jwt', { session: false }),
  editTaskController,
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteTaskContoller,
);

export { router as taskRoutes };
