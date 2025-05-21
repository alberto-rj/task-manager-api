import { z } from 'zod';

import { validate } from '../utils/validate';

export const id = z
  .string({ message: 'Must be string' })
  .min(1, { message: 'Can not be empty' })
  .uuid({ message: 'ID Must be in the UUID format' });

export const name = z
  .string({ message: 'Must be string' })
  .min(3, { message: 'Must have at least 3 characters' })
  .max(30, { message: 'Must have until 30 characters' });

export const description = z
  .string({ message: 'Must be string' })
  .min(3, { message: 'Must have at least 3 characters' })
  .max(60, { message: 'Must have until 60 characters' })
  .optional();

export const isArchived = z
  .boolean({ message: 'Must be boolean' })
  .default(false);

export const authorId = id;

export const createdAt = z.date();

export const updatedAt = z.date();

export const createProjectRIOSchema = z.object({
  body: z.object({
    name,
    description,
  }),
});

export type CreateProjectRIO = z.infer<typeof createProjectRIOSchema>;

export const toCreateProjectRIO = (data: unknown): CreateProjectRIO => {
  return validate<CreateProjectRIO>(createProjectRIOSchema, data);
};

export const updateProjectRIOSchema = z.object({
  params: z.object({
    projectId: id,
  }),
  body: z.object({
    name,
    description,
    isArchived: isArchived.optional(),
  }),
});

export type UpdateProjectRIO = z.infer<typeof updateProjectRIOSchema>;

export const toUpdateProjectRIO = (data: unknown): UpdateProjectRIO => {
  return validate<UpdateProjectRIO>(updateProjectRIOSchema, data);
};

export const deleteProjectRIOSchema = z.object({
  params: z.object({
    projectId: id,
  }),
});

export type DeleteProjectRIO = z.infer<typeof deleteProjectRIOSchema>;

export const toDeleteProjectRIO = (data: unknown): DeleteProjectRIO => {
  return validate<DeleteProjectRIO>(deleteProjectRIOSchema, data);
};

export const archiveProjectRIOSchema = z.object({
  params: z.object({
    projectId: id,
  }),
  body: z.object({
    isArchived,
  }),
});

export type ArchiveProjectRIO = z.infer<typeof archiveProjectRIOSchema>;

export const toArchiveProjectRIO = (data: unknown): ArchiveProjectRIO => {
  return validate<ArchiveProjectRIO>(archiveProjectRIOSchema, data);
};

export const getProjectRIOSchema = z.object({
  params: z.object({
    projectId: id,
  }),
});

export type GetProjectRIO = z.infer<typeof getProjectRIOSchema>;

export const toGetProjectRIO = (data: unknown): GetProjectRIO => {
  return validate<GetProjectRIO>(getProjectRIOSchema, data);
};

export const getProjectsRIOSchema = z.object({
  query: z.object({
    includeArchived: z
      .string()
      .regex(/^(?:true|false)$/i, {
        message:
          'Must be either "true" or "false". If a value is not provided, it defaults to "false"',
      })
      .default('false')
      .transform((arg) => arg === 'true'),
  }),
});

export type GetProjectsRIO = z.infer<typeof getProjectsRIOSchema>;

export const toGetProjectsRIO = (data: unknown): GetProjectsRIO => {
  return validate<GetProjectsRIO>(getProjectsRIOSchema, data);
};
