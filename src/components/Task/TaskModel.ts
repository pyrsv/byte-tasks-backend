import { Schema, model } from 'mongoose';
import { ITask } from './types';

const UserSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  timeTracked: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = model<ITask>('task', UserSchema);
