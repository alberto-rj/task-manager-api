import { z } from 'zod';

import { Task, TaskPriority, TaskStatus } from '../models/task.model';
import { compareDates } from '../utils/comparator';
import { validate } from '../utils/validate';

export const id = z
  .string({ message: 'Must be string' })
  .min(1, { message: 'Can not be empty' })
  .uuid({ message: 'ID Must be in UUID format' });

export const title = z
  .string({ message: 'Must be string' })
  .min(3, { message: 'Must have at least 3 characters' })
  .max(30, { message: 'Must have until 30 characters' });

export const description = z
  .string({ message: 'Must be string' })
  .min(3, { message: 'Must have at least 3 characters' })
  .max(60, { message: 'Must have until 60 characters' })
  .optional();

export const status = z
  .enum([
    TaskStatus.PENDING,
    TaskStatus.IN_PROGRESS,
    TaskStatus.REVIEW,
    TaskStatus.CANCELLED,
    TaskStatus.COMPLETED,
  ])
  .default(TaskStatus.PENDING);

export const priority = z
  .enum([
    TaskPriority.LOW,
    TaskPriority.MEDIUM,
    TaskPriority.HIGH,
    TaskPriority.URGENT,
  ])
  .default(TaskPriority.MEDIUM);

//  dueDate must be greater than current date
export const dueDate = z
  .string({ message: 'Must be string' })
  .refine((arg) => compareDates(new Date(arg), new Date()) > 0, {
    message: 'Must be in the future',
  })
  .transform((arg) => new Date(arg))
  .optional();

export const isArchived = z
  .boolean({ message: 'Must be boolean' })
  .default(false);

export const authorId = id;

export const projectId = id;

export const assignId = id.optional();

export const createdAt = z.date();

export const updatedAt = z.date();

export const createTaskInputSchema = z.object({
  title,
  description,
  status,
  priority,
  dueDate,
  isArchived,
  authorId,
  projectId,
  assignId,
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;

export function toCreateTaskInput(payload: unknown): CreateTaskInput {
  return validate<CreateTaskInput>(createTaskInputSchema, payload);
}

export const updateTaskInputSchema = z.object({
  title: title.optional(),
  description: description.optional(),
  status: status.optional(),
  priority: priority.optional(),
  dueDate: dueDate.optional(),
  isArchived: isArchived.optional(),
  authorId: authorId.optional(),
  projectId: projectId.optional(),
  assignId: assignId.optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

export function toUpdateTaskInput(payload: unknown): UpdateTaskInput {
  return validate<UpdateTaskInput>(updateTaskInputSchema, payload);
}

export type TaskOutput = Omit<Task, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export function toTaskOutput(task: Task): TaskOutput {
  return {
    ...task,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
}
