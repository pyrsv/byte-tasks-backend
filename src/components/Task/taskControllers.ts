import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { Task } from './TaskModel';
// import { taskRoutes } from './taskRoutes';
import { ITask } from './types';

const getTaskWithTimeTracked = (task: ITask): any => {
  const updated = new Date(task.updatedAt);
  const now = new Date();

  const diff = now.getTime() - updated.getTime();

  const taskWithTimeTracked = {
    ...task.toObject(),
    timeTracked: task.timeTracked + diff,
  };

  return taskWithTimeTracked;
};

export const createTaskController: RequestHandler = async (
  req, res, next,
) => {
  try {
    const { user: { _id }, body } = req;

    const taskWithUserId = {
      ...body,
      timeTracked: 0,
      userId: _id,
    };

    const createdTask = new Task(taskWithUserId);

    await createdTask.save();

    res.status(201).json(createdTask);
  } catch (err) {
    next(err);
  }
};

export const getTasksCollectionController: RequestHandler = async (
  req, res, next,
) => {
  try {
    const { user: { _id } } = req;

    const tasks = await Task.find({ userId: _id });

    const taskWithTimeTracked = tasks.map((task) => {
      if (task.isActive) {
        return getTaskWithTimeTracked(task);
      }

      return task;
    });

    return res.status(200).send(taskWithTimeTracked);
  } catch (err) {
    return next(err);
  }
};

export const getTaskController: RequestHandler = async (
  req, res, next,
) => {
  try {
    const { params: { id } } = req;
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      return res.status(400).json({ message: `Id ${id} is invalid` });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: `Task id ${id} not found` });
    }

    if (!task.isActive) {
      return res.status(200).json(task);
    }

    const updated = new Date(task.updatedAt);
    const now = new Date();

    const diff = now.getTime() - updated.getTime();

    const taskWithTimeTracked = {
      ...task.toObject(),
      timeTracked: task.timeTracked + diff,
    };

    return res.status(200).json(taskWithTimeTracked);
  } catch (err) {
    return next(err);
  }
};

export const editTaskController: RequestHandler = async (req, res, next) => {
  try {
    const { params: { id }, body } = req;

    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      return res.status(400).json({ message: `Id ${id} is invalid` });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: `Task id ${id} not found` });
    }

    const now = new Date();
    const { updatedAt, timeTracked } = task;
    const { isActive, timeTracked: updatedTimeTracked } = body;

    const updates = {
      ...body,
    };

    if (!isActive) {
      updates.timeTracked = updatedTimeTracked === undefined
        ? timeTracked + (now.getTime() - new Date(updatedAt).getTime())
        : 0;
    }

    // console.log(`updates`, updates);

    const updatedTask = await Task.findByIdAndUpdate(
      id, { ...updates, updatedAt: new Date().toJSON() }, { new: true },
    );

    return res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTaskContoller: RequestHandler = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      return res.status(400).json({ message: `Id ${id} is invalid` });
    }

    const removedTask = await Task.findByIdAndDelete(id);

    if (!removedTask) {
      return res.status(404).json({ message: `Task id ${id} not found` });
    }

    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
