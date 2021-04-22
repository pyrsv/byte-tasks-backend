import { Document } from 'mongoose';

export interface ITask extends Document {
  name: string,
  descriptiom: string,
  timeTracked: number,
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
}
