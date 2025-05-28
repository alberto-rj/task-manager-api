import { NextFunction, Response } from 'express';

import { IAuthRequest } from '@/dtos/auth/auth.input.dto';

export const newTaskController = () => {
  const createTask = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {};

  const getAllTasks = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {};

  const getTask = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {};

  const updateTask = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {};

  const deleteTask = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {};

  return {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
  };
};
