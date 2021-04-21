import {
  Strategy, ExtractJwt, StrategyOptions,
} from 'passport-jwt';
import * as dotenv from 'dotenv';
import { PassportStatic } from 'passport';
import { User } from './UserModel';
import { IUser } from './types';

dotenv.config();

export const passportInstance = (passport: PassportStatic): void => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };

  passport.use(
    'jwt',
    // eslint-disable-next-line camelcase
    new Strategy(opts, (jwt_payload: IUser, done) => {
      // eslint-disable-next-line camelcase
      User.findById(jwt_payload.id)
        .then((customer) => {
          if (customer) {
            return done(null, customer);
          }
          return done(null, false);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }),
  );
};
