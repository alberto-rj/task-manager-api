import {
  ArchiveTaskSIO,
  CreateTaskSIO,
  DeleteTaskSIO,
  GetTaskSIO,
  GetTasksSIO,
  UpdateTaskSIO,
  UpdateTaskStatusSIO,
} from '../../dtos/task/task-s-i-o';
import { MinimalTaskROO } from '../../dtos/task/task-r-o-o';

export interface ITaskService {
  create(sio: CreateTaskSIO): Promise<MinimalTaskROO>;

  getAll(sio: GetTasksSIO): Promise<MinimalTaskROO[]>;

  getById(sio: GetTaskSIO): Promise<MinimalTaskROO | null>;

  update(sio: UpdateTaskSIO): Promise<MinimalTaskROO>;

  updateStatus(sio: UpdateTaskStatusSIO): Promise<MinimalTaskROO>;

  archive(sio: ArchiveTaskSIO): Promise<MinimalTaskROO>;

  delete(sio: DeleteTaskSIO): Promise<void>;
}
