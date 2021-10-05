import { Router } from 'express';
import passport from 'passport';

import { validationMiddleware } from '../../middlewares/validateMiddleware';
import { loginValidationSchema, registerValidationSchema } from './authValidators';
import { registerController, loginController, getUserController } from './authControllers';

const router = Router();

router.post('/register', validationMiddleware(registerValidationSchema), registerController);

router.post('/login', validationMiddleware(loginValidationSchema), loginController);

router.get('/user/self', passport.authenticate('jwt', { session: false }), getUserController);

export { router as authRoutes };
