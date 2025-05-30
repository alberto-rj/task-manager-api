import { z } from 'zod';

import { limit, page, sortOrder } from '@/dtos/common/common.base.dto';
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

export const projectCreate = z.object({
  body: z
    .object({
      name,
      description: description.optional(),
      coverImage: coverImage.optional(),
      startDate: startDate.optional(),
      endDate: endDate.optional(),
      isPublic: isPublic.optional(),
    })
    .refine(
      ({ startDate, endDate }) => startDate && endDate && endDate > startDate,
      {
        message: 'endDate must be greater than startDate.',
        path: ['endDate'],
      },
    ),
});

export const projectUpdate = z.object({
  params: z.object({ id }),
  body: z
    .object({
      name: name.optional(),
      description: description.optional(),
      coverImage: coverImage.optional(),
      startDate: startDate.optional(),
      endDate: endDate.optional(),
    })
    .refine(
      ({ startDate, endDate }) => startDate && endDate && endDate > startDate,
      {
        message: 'endDate must be greater than startDate.',
        path: ['endDate'],
      },
    ),
});

export const projectUpdateIsArchived = z.object({
  params: z.object({ id }),
  body: z.object({
    isArchived,
  }),
});

export const projectDelete = z.object({
  params: z.object({ id }),
});

export const projectRead = z.object({
  params: z.object({ id }),
});

export const projectList = z.object({
  query: z.object({
    includeArchived,
    sortOrder,
    limit,
    page,
  }),
});

export type ProjectCreate = z.infer<typeof projectCreate>;

export type ProjectUpdate = z.infer<typeof projectUpdate>;

export type ProjectDelete = z.infer<typeof projectDelete>;

export type ProjectUpdateIsArchived = z.infer<typeof projectUpdateIsArchived>;

export type ProjectList = z.infer<typeof projectList>;

export type ProjectRead = z.infer<typeof projectRead>;

export type ProjectCreateInput = ProjectCreate['body'] & {
  authorId: string;
};

export type ProjectReadInput = ProjectRead['params'] & {
  authorId: string;
};

export type ProjectListInput = ProjectList['query'] & {
  authorId: string;
};

export type ProjectUpdateInput = ProjectUpdate['body'] & {
  id: string;
  authorId: string;
};

export type ProjectUpdateIsArchivedInput = ProjectUpdateIsArchived['body'] & {
  id: string;
  authorId: string;
};

export type ProjectDeleteInput = ProjectDelete['params'] & {
  authorId: string;
};

export type ProjectEntries = ProjectCreate['body'] & {
  authorId: string;
};

export type ProjectChanges = Partial<{
  name: string;
  description: string;
  coverImage: string;
  startDate: Date;
  endDate: Date;
  isPublic: boolean;
  isArchived: boolean;
  archivedAt: Date | null;
  authorId: string;
}>;

export const toProjectCreate = (data: unknown): ProjectCreate => {
  return validate<ProjectCreate>(projectCreate, data);
};

export const toProjectRead = (data: unknown): ProjectRead => {
  return validate<ProjectRead>(projectRead, data);
};

export const toProjectList = (data: unknown): ProjectList => {
  return validate<ProjectList>(projectList, data);
};

export const toProjectUpdateIsArchived = (
  data: unknown,
): ProjectUpdateIsArchived => {
  return validate<ProjectUpdateIsArchived>(projectUpdateIsArchived, data);
};

export const toProjectUpdate = (data: unknown): ProjectUpdate => {
  return validate<ProjectUpdate>(projectUpdate, data);
};

export const toProjectDelete = (data: unknown): ProjectDelete => {
  return validate<ProjectDelete>(projectDelete, data);
};
