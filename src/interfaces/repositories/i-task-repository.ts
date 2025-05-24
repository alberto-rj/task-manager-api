import {
  CreateTaskDbIO,
  DeleteTaskDbIO,
  FindTaskDbIO,
  FindTasksDbIO,
  UpdateTaskDbIO,
} from '@/dtos/task-db-i-o';
import { Task } from '@/models/task-model';

export interface ITaskRepository {
  create(dbIO: CreateTaskDbIO): Promise<Task>;

  findAll(dbIO: FindTasksDbIO): Promise<Task[]>;

  findById(dbIO: FindTaskDbIO): Promise<Task | null>;

  update(dbIO: UpdateTaskDbIO): Promise<Task>;

  delete(dbIO: DeleteTaskDbIO): Promise<void>;
}
