import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = model('task', UserSchema);
