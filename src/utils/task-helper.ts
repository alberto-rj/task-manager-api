import { Task } from '@/models/task-model';
import { MinimalTaskROO } from '@/dtos/task/task-r-o-o';
import {
  CreateTaskDbIO,
  FindTasksDbIO,
  UpdateTaskDbIO,
} from '@/dtos/task/task-db-i-o';
import {
  CreateTaskSIO,
  GetTasksSIO,
  UpdateTaskSIO,
} from '@/dtos/task/task-s-i-o';

export const toMinimalTaskROO = (task: Task): MinimalTaskROO => {
  return {
    ...task,
    dueDate: task.dueDate?.toISOString() || null,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
};

export const toCreateTaskDbIO = (sio: CreateTaskSIO): CreateTaskDbIO => {
  return {
    ...sio,
    dueDate: sio.dueDate ? new Date(sio.dueDate) : undefined,
  };
};

export const toFindTasksDbIo = (sio: GetTasksSIO): FindTasksDbIO => {
  return {
    ...sio,

    dueDateMin:
      typeof sio.dueDateMin === 'string' ? new Date(sio.dueDateMin) : undefined,

    dueDateMax:
      typeof sio.dueDateMax === 'string' ? new Date(sio.dueDateMax) : undefined,

    assignToMe:
      typeof sio.assignToMe === 'string'
        ? sio.assignToMe === 'true'
        : undefined,

    createdByMe:
      typeof sio.createdByMe === 'string'
        ? sio.createdByMe === 'true'
        : undefined,

    includeArchived:
      typeof sio.includeArchived === 'string'
        ? sio.includeArchived === 'true'
        : undefined,

    page: typeof sio.page === 'string' ? parseInt(sio.page) : undefined,

    limit: typeof sio.limit === 'string' ? parseInt(sio.limit) : undefined,
  };
};

export const toUpdateTaskDbIO = (sio: UpdateTaskSIO): UpdateTaskDbIO => {
  return {
    ...sio,
    dueDate: sio.dueDate ? new Date(sio.dueDate) : undefined,
  };
};
