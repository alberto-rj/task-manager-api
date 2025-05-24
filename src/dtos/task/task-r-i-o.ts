import { z } from 'zod';

import { TaskPriority, TaskStatus } from '@/models/task-model';
import { compareDates } from '@/utils/comparator';
import { validate } from '@/utils/validate';

export const id = z
  .string({ message: 'Must be string' })
  .min(1, { message: 'Can not be empty' })
  .uuid({ message: 'ID Must be in the UUID format' });

export const title = z
  .string({ message: 'Must be string' })
  .min(3, { message: 'Must have at least 3 characters' })
  .max(30, { message: 'Must have until 30 characters' });

export const description = z
  .string({ message: 'Must be string' })
  .min(3, { message: 'Must have at least 3 characters' })
  .max(60, { message: 'Must have until 60 characters' });

export const status = z.enum(
  [
    TaskStatus.PENDING,
    TaskStatus.IN_PROGRESS,
    TaskStatus.REVIEW,
    TaskStatus.CANCELLED,
    TaskStatus.COMPLETED,
  ],
  { message: 'Invalid task status' },
);

export const priority = z.enum(
  [
    TaskPriority.LOW,
    TaskPriority.MEDIUM,
    TaskPriority.HIGH,
    TaskPriority.URGENT,
  ],
  { message: 'Invalid task priority' },
);

//  dueDate must be greater than current date
export const dueDate = z
  .string({ message: 'Must be string' })
  .refine((value) => compareDates(new Date(value), new Date()) > 0, {
    message: 'Must be in the future',
  });

export const isArchived = z.boolean({ message: 'Must be boolean' });

export const isoDate = z.string().refine((value) => value.trim() !== '', {
  message: 'Must be in ISO869 format',
});

export const isBooleanString = z.string().regex(/^(?:true|false)$/, {
  message: 'Must be either true or false',
});

export const search = z.string().min(1, { message: 'Can not be empty' });

const sortableTaskFields = [
  'title',
  'description',
  'status',
  'prIOrity',
  'dueDate',
  'createdAt',
  'updatedAt',
];

const extractableTaskFields = [...sortableTaskFields, 'all'];

const includesExtractableTaskFields = (fields: string) => {
  return extractableTaskFields.join(',').includes(fields);
};

export const fields = z
  .string()
  .refine((value) => includesExtractableTaskFields(value));

export const sort = z.enum([
  'title',
  'description',
  'status',
  'prIOrity',
  'dueDate',
  'createdAt',
  'updatedAt',
]);

export const sortOrder = z.enum(['asc', 'desc']);

export const page = z
  .string()
  .regex(/^[1-9][0-9]+$/, {
    message: 'Must be greater or equal than 1.',
  })
  .default('1');

export const limit = z
  .string()
  .regex(/^\d+$/, {
    message:
      'Must be a natural number. If a value is not provide, its default to 20',
  })
  .default('20');

export const authorId = id;

export const projectId = id;

export const assigneeId = id;

export const createdAt = z.date();

export const updatedAt = z.date();

export const createTaskRIOSchema = z.object({
  body: z.object({
    title,
    description: description.optional(),
    priority: priority.optional(),
    dueDate: dueDate.optional(),
    projectId,
    assigneeId,
  }),
});

export type CreateTaskRIO = z.infer<typeof createTaskRIOSchema>;

export function toCreateTaskRIO(data: unknown): CreateTaskRIO {
  return validate<CreateTaskRIO>(createTaskRIOSchema, data);
}

export const getTaskRIOSchema = z.object({
  params: z.object({
    id,
    fields: fields.optional(),
  }),
});

export type GetTaskRIO = z.infer<typeof getTaskRIOSchema>;

export function toGetTaskRIO(data: unknown): GetTaskRIO {
  return validate<GetTaskRIO>(getTaskRIOSchema, data);
}

export const getTasksRIOSchema = z.object({
  params: z.object({
    status: status.optional(),
    prIOrity: priority.optional(),
    dueDateMin: isoDate.optional(),
    dueDateMax: isoDate.optional(),
    projectId: projectId.optional(),
    assignToMe: isBooleanString.optional(),
    createdByMe: isBooleanString.optional(),
    includeArchived: isBooleanString.optional(),
    fields: fields.optional(),
    search: search.optional(),
    sort: sort.optional(),
    sortOrder: sortOrder.optional(),
    page,
    limit,
  }),
});

export type GetTasksRIO = z.infer<typeof getTasksRIOSchema>;

export function toGetTasksRIO(data: unknown): GetTasksRIO {
  return validate<GetTasksRIO>(getTasksRIOSchema, data);
}

export const updateTaskRIOSchema = z.object({
  params: z.object({
    id: id,
  }),
  body: z.object({
    title,
    description,
    status,
    priority,
    dueDate,
    assigneeId,
  }),
});

export type UpdateTaskRIO = z.infer<typeof updateTaskRIOSchema>;

export function toUpdateTaskRIO(data: unknown): UpdateTaskRIO {
  return validate<UpdateTaskRIO>(updateTaskRIOSchema, data);
}

export const updateTaskStatusRIOSchema = z.object({
  params: z.object({
    id,
  }),
  body: z.object({
    status,
  }),
});

export type UpdateTaskStatusRIO = z.infer<typeof updateTaskStatusRIOSchema>;

export function toUpdateTaskStatusRIO(data: unknown): UpdateTaskStatusRIO {
  return validate<UpdateTaskStatusRIO>(updateTaskStatusRIOSchema, data);
}

export const archiveTaskRIOSchema = z.object({
  params: z.object({
    id: id,
  }),
  body: z.object({
    isArchived,
  }),
});

export type ArchiveTaskRIO = z.infer<typeof archiveTaskRIOSchema>;

export function toArchiveTaskRIO(data: unknown): ArchiveTaskRIO {
  return validate<ArchiveTaskRIO>(archiveTaskRIOSchema, data);
}

export const deleteTaskRIOSchema = z.object({
  params: z.object({
    id,
  }),
});

export type DeleteTaskRIO = z.infer<typeof deleteTaskRIOSchema>;

export function toDeleteTaskRIO(data: unknown): DeleteTaskRIO {
  return validate<DeleteTaskRIO>(deleteTaskRIOSchema, data);
}
