import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }));

router.get('/', passport.authenticate('jwt', { session: false }));

router.get('/:id', passport.authenticate('jwt', { session: false }));

router.patch('/:id', passport.authenticate('jwt', { session: false }));

router.delete('/:id', passport.authenticate('jwt', { session: false }));
