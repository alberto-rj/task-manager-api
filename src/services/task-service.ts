import {
  CreateTaskSIO,
  GetTasksSIO,
  GetTaskSIO,
  UpdateTaskSIO,
  UpdateTaskStatusSIO,
  ArchiveTaskSIO,
  DeleteTaskSIO,
} from '@/dtos/task/task-s-i-o';
import { MinimalTaskROO } from '@/dtos/task/task-r-o-o';
import { ITaskService } from '@/interfaces/services/i-task-service';
import { ITaskRepository } from '@/interfaces/repositories/i-task-repository';
import {
  toCreateTaskDbIO,
  toFindTasksDbIo,
  toMinimalTaskROO,
  toUpdateTaskDbIO,
} from '@/utils/task-helper';
import { NotFoundError } from '@/utils/app-error';

export class TaskService implements ITaskService {
  constructor(private taskRepo: ITaskRepository) {}

  async create(sio: CreateTaskSIO): Promise<MinimalTaskROO> {
    const taskToCreate = toCreateTaskDbIO(sio);
    const createdTask = await this.taskRepo.create(taskToCreate);

    return toMinimalTaskROO(createdTask);
  }

  async getAll(sio: GetTasksSIO): Promise<MinimalTaskROO[]> {
    const dbIO = toFindTasksDbIo(sio);
    const persistedTasks = await this.taskRepo.findAll(dbIO);

    return persistedTasks.map(toMinimalTaskROO);
  }

  async getById(sio: GetTaskSIO): Promise<MinimalTaskROO | null> {
    const persistedTask = await this.taskRepo.findById(sio);

    if (persistedTask === null) {
      throw new NotFoundError(`Task not found`);
    }

    return toMinimalTaskROO(persistedTask);
  }

  async update(sio: UpdateTaskSIO): Promise<MinimalTaskROO> {
    const taskToUpdate = toUpdateTaskDbIO(sio);
    const updatedTask = await this.taskRepo.update(taskToUpdate);

    return toMinimalTaskROO(updatedTask);
  }

  async updateStatus(sio: UpdateTaskStatusSIO): Promise<MinimalTaskROO> {
    const updatedTask = await this.taskRepo.update(sio);

    return toMinimalTaskROO(updatedTask);
  }

  async archive(sio: ArchiveTaskSIO): Promise<MinimalTaskROO> {
    const updatedTask = await this.taskRepo.update(sio);

    return toMinimalTaskROO(updatedTask);
  }

  async delete(sio: DeleteTaskSIO): Promise<void> {
    await this.taskRepo.delete(sio);
  }
}
