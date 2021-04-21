import { NextFunction, Request, response, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import * as dotenv from 'dotenv';

import { User } from './UserModel';
import { IUser } from './types'
import jwt from 'jsonwebtoken';

dotenv.config()

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  const {body: userRequest} = req;

  try {
    const newUser = new User(userRequest);
    const isUserExists = await User.findOne({ email: userRequest.email });

    if (isUserExists) {
      res.json({ email: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(userRequest.password, 10);
    newUser.password = hashedPassword;
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    next(err)
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;

  try {
    const maybeCustomer = await User.findOne({ email }).select('+password');
    console.log(`maybeCustomer`, maybeCustomer)

    if(!maybeCustomer) {
      return res.status(401).json({message: 'Invalid login or password'})
    }


    const isPasswordMatch = await bcrypt.compare(password, maybeCustomer.password)

    if(!isPasswordMatch) {
      return res.status(401).json({message: 'Invalid login or password'})
    }

    jwt.sign(
      {
        id: maybeCustomer._id,
      }, 
      process.env.SECRET,
      {
        expiresIn: 30000,
      },
      (_err, token) => {
        return res.json({
          token
        });
      }
    )
  } catch(err) {
    next(err)
  }
}

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(req.user)
  } catch (err) {
    next(err)
  }
}
