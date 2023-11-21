import { TaskPriority, TaskStatus } from '../models/task-model';

export type CreateTaskDbIO = {
  authorId: string;
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  projectId: string;
  assigneeId: string;
};

export type FindTasksDbIO = {
  authorId: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDateMin?: Date;
  dueDateMax?: Date;
  projectId?: string;
  assignToMe?: boolean;
  createdByMe?: boolean;
  includeArchived?: boolean;
  fields?: string;
  search?: string;
  sort?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
};

export type FindTaskDbIO = {
  id: string;
  authorId: string;
  fields?: string;
};

export type UpdateTaskDbIO = {
  id: string;
  authorId: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  isArchived?: boolean;
  projectId?: string;
  assigneeId?: string;
};

export type DeleteTaskDbIO = {
  id: string;
  authorId: string;
};
