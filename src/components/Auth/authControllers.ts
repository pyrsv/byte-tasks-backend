import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import jwt from 'jsonwebtoken';
import { User } from './UserModel';
import { IUser } from './types';

dotenv.config();

export const registerController: RequestHandler<
  never,
  Record<string, string> | IUser,
  IUser
> = async (req, res, next) => {
  const { body: userRequest } = req;

  try {
    const newUser = new User(userRequest);
    const isUserExists = await User.findOne({ email: userRequest.email });

    if (isUserExists) {
      res.status(400).json({ email: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(userRequest.password, 10);
    newUser.password = hashedPassword;
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const loginController: RequestHandler<
  never,
  Record<string, string>,
  IUser
> = async (req, res, next) => {
  const { body: { email, password } } = req;

  try {
    const maybeCustomer = await User.findOne({ email }).select('+password');

    if (!maybeCustomer) {
      return res.status(401).json({ message: 'Invalid login or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, maybeCustomer.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid login or password' });
    }

    return jwt.sign(
      {
        id: maybeCustomer._id,
      },
      process.env.SECRET,
      {},
      (_err, token) => res.json({
        token,
      }),
    );
  } catch (err) {
    next(err);
  }
};

export const getUserController:RequestHandler<
  never,
  IUser,
  IUser
> = (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res.status(200).json(req.user);
  } catch (err) {
    return next(err);
  }
};
