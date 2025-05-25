import { z } from 'zod';

import {
  id,
  name,
  description,
  coverImage,
  startDate,
  endDate,
  isPublic,
  isArchived,
  includeArchived,
} from '@/dtos/project/project.base.dto';
import { validate } from '@/utils/validate';

export const createProjectSchema = z.object({
  body: z.object({
    name,
    description: description.optional(),
    coverImage: coverImage.optional(),
    startDate: startDate.optional(),
    endDate: endDate.optional(),
    isPublic: isPublic.optional(),
  }),
});

export const projectId = z.object({
  projectId: id,
});

export const updateProjectSchema = z.object({
  params: projectId,
  body: z.object({
    name,
    description: description.optional(),
    coverImage: coverImage.optional(),
    startDate: startDate.optional(),
    endDate: endDate.optional(),
  }),
});

export const deleteProjectDTOSchema = z.object({
  params: projectId,
});

export const archiveProjectSchema = z.object({
  params: projectId,
  body: z.object({
    isArchived,
  }),
});

export const getProjectSchema = z.object({
  params: projectId,
});

export const listProjectsSchema = z.object({
  query: z.object({
    includeArchived,
  }),
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;

export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;

export type DeleteProjectDTO = z.infer<typeof deleteProjectDTOSchema>;

export type ArchiveProjectDTO = z.infer<typeof archiveProjectSchema>;

export type ListProjectDTO = z.infer<typeof listProjectsSchema>;

export type GetProjectDTO = z.infer<typeof getProjectSchema>;

export type CreateProjectBodyDTO = CreateProjectDTO['body'];

export type UpdateProjectBodyDTO = UpdateProjectDTO['body'];

export type ProjectQueryDTO = ListProjectDTO['query'] & {
  authorId: string;
};

export type ProjectEntriesDTO = CreateProjectDTO['body'] & {
  authorId: string;
};

export type ProjectChangesDTO = Partial<{
  name: string;
  description: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  isArchived: boolean;
  authorId: string;
}>;

export const toCreateProjectDTO = (data: unknown): CreateProjectDTO => {
  return validate<CreateProjectDTO>(createProjectSchema, data);
};

export const toDeleteProjectDTO = (data: unknown): DeleteProjectDTO => {
  return validate<DeleteProjectDTO>(deleteProjectDTOSchema, data);
};

export const toArchiveProjectDTO = (data: unknown): ArchiveProjectDTO => {
  return validate<ArchiveProjectDTO>(archiveProjectSchema, data);
};

export const toGetProjectDTO = (data: unknown): GetProjectDTO => {
  return validate<GetProjectDTO>(getProjectSchema, data);
};

export const toUpdateProjectDTO = (data: unknown): UpdateProjectDTO => {
  return validate<UpdateProjectDTO>(updateProjectSchema, data);
};

export const toListProjectDTO = (data: unknown): ListProjectDTO => {
  return validate<ListProjectDTO>(listProjectsSchema, data);
};
