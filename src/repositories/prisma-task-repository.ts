import { PrismaClient } from '@/prisma';
import {
  CreateTaskDbIO,
  FindTasksDbIO,
  FindTaskDbIO,
  UpdateTaskDbIO,
  DeleteTaskDbIO,
} from '@/dtos/task/task-db-i-o';
import { Task } from '@/models/task-model';
import { ITaskRepository } from '@/interfaces/repositories/i-task-repository';

export class PrismaTaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaClient) {}

  async create({
    title,
    description,
    priority,
    dueDate,
    projectId,
    assigneeId,
    authorId,
  }: CreateTaskDbIO): Promise<Task> {
    const createdTask = await this.prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate,
        projectId,
        assigneeId,
        authorId,
      },
    });

    return createdTask;
  }

  async findAll({
    priority,
    status,
    dueDateMin,
    dueDateMax,
    authorId,
    projectId,
    createdByMe,
    assignToMe,
    includeArchived,
    search,
    fields,
    sort,
    sortOrder,
    page,
    limit,
  }: FindTasksDbIO): Promise<Task[]> {
    const where: Record<string, any> = {};
    const orderBy: Record<string, 'asc' | 'desc'> = {};

    where.isArchived = false;

    if (typeof priority !== 'undefined') {
      where.priority = priority;
    }

    if (typeof status !== 'undefined') {
      where.status = status;
    }

    if (
      typeof dueDateMin !== 'undefined' ||
      typeof dueDateMax !== 'undefined'
    ) {
      where.dueDate = {};

      if (typeof dueDateMin !== 'undefined') {
        where.dueDate.gte = dueDateMin;
      }

      if (typeof dueDateMax !== 'undefined') {
        where.dueDate.lte = dueDateMax;
      }
    }

    if (typeof projectId !== 'undefined') {
      where.projectId = projectId;
    }

    if (typeof includeArchived !== 'undefined') {
      where.isArchived = undefined;
    }

    if (typeof createdByMe !== 'undefined') {
      where.authorId = authorId;
    }

    if (typeof assignToMe !== 'undefined') {
      where.assigneeId = authorId;
    }

    if (typeof search !== 'undefined') {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (typeof sort !== 'undefined') {
      orderBy[sort] = sortOrder === 'desc' ? 'desc' : 'asc';
    }

    const skip =
      typeof limit !== 'undefined' && typeof page !== 'undefined'
        ? limit * page
        : undefined;

    const take = typeof limit !== 'undefined' ? limit : undefined;

    const persistedTasks = await this.prisma.task.findMany({
      where,
      orderBy,
      skip,
      take,
    });

    return persistedTasks;
  }

  async findById({ id, authorId, fields }: FindTaskDbIO): Promise<Task | null> {
    // const select = this.getSelectedFields(fields);

    const persistedTask = await this.prisma.task.findUnique({
      where: { id, authorId },
    });

    return persistedTask;
  }

  async update({
    id,
    title,
    description,
    priority,
    status,
    dueDate,
    isArchived,
    authorId,
    projectId,
    assigneeId,
  }: UpdateTaskDbIO): Promise<Task> {
    const updatedTask = await this.prisma.task.update({
      data: {
        title,
        description,
        priority,
        status,
        dueDate,
        isArchived,
        projectId,
        assigneeId,
      },
      where: { id, authorId },
    });

    return updatedTask;
  }

  async delete({ id, authorId }: DeleteTaskDbIO): Promise<void> {
    await this.prisma.task.delete({ where: { id, authorId } });
  }

  private getSelectedFields(
    fields: string | undefined,
  ): Record<string, boolean> | undefined {
    const select =
      typeof fields === 'string'
        ? fields
            .split(',')
            .reduce<Record<string, boolean>>((oldSelect, field) => {
              const newSelect = oldSelect;
              newSelect[field] = true;

              return newSelect;
            }, {})
        : undefined;

    return select;
  }
}
