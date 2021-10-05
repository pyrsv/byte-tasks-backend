import { Router } from 'express';
import passport from 'passport';

import { validationMiddleware } from '../../middlewares/validateMiddleware';
import { loginValidationSchema, registerValidationSchema } from './authValidators';
import { registerController, loginController, getUserController } from './authControllers';

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Regiter new user.
*/
router.post('/register', validationMiddleware(registerValidationSchema), registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login using existing credentials.
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *        description: hello
*/
router.post('/login', validationMiddleware(loginValidationSchema), loginController);

/**
 * @swagger
 * /user/self:
 *   get:
 *     summary: Get current user.
*/
router.get('/user/self', passport.authenticate('jwt', { session: false }), getUserController);

export { router as authRoutes };
