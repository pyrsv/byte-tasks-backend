import { Schema, model } from 'mongoose';
import { ITask } from './types';

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  timeTracked: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = model<ITask>('task', TaskSchema);
