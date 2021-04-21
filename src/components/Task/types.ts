import { Document } from 'mongoose';

export interface ITask extends Document {
  name: string,
  descriptiom: string,
  timeTracked: number,
  createdAt: string,
  isActive: boolean,
}
