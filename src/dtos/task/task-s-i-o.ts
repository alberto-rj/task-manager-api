import {
  ArchiveTaskRIO,
  CreateTaskRIO,
  DeleteTaskRIO,
  GetTaskRIO,
  GetTasksRIO,
  UpdateTaskRIO,
  UpdateTaskStatusRIO,
} from './task-r-i-o';

type AuthorId = {
  authorId: string;
};

export type CreateTaskSIO = CreateTaskRIO['body'] & AuthorId;

export type GetTasksSIO = GetTasksRIO['params'] & AuthorId;

export type GetTaskSIO = GetTaskRIO['params'] & AuthorId;

export type UpdateTaskSIO = UpdateTaskRIO['params'] &
  UpdateTaskRIO['body'] &
  AuthorId;

export type UpdateTaskStatusSIO = UpdateTaskStatusRIO['params'] &
  UpdateTaskStatusRIO['body'] &
  AuthorId;

export type ArchiveTaskSIO = ArchiveTaskRIO['params'] &
  ArchiveTaskRIO['body'] &
  AuthorId;

export type DeleteTaskSIO = DeleteTaskRIO['params'] & AuthorId;
