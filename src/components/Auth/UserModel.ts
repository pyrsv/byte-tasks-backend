import { Schema, model } from 'mongoose';
import _ from 'lodash';

import { IUser } from './types';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.set('toJSON', {
  transform: (_doc: unknown, ret: IUser)  => _.omit(ret, ['password']),
});

export const User = model<IUser>('user', UserSchema);
