import { z } from 'zod';

import {
  isoDate,
  limit,
  page,
  search,
  sortOrder,
} from '@/dtos/common/common.base.dto';
import {
  id,
  name,
  status,
  priority,
  description,
  coverImage,
  startDate,
  endDate,
  isPublic,
  isArchived,
  includePrivate,
  orderBy,
} from '@/dtos/project/project.base.dto';
import { ProjectStatus, ProjectPriority } from '@/models/project.model';
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
      status,
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
    name: name.optional(),
    status,
    priority,
    startDateMin: isoDate('startDateMin').optional(),
    startDateMax: isoDate('startDateMax').optional(),
    endDateMin: isoDate('endDateMin').optional(),
    endDateMax: isoDate('endDateMax').optional(),
    createdAtMin: isoDate('createdAtMin').optional(),
    createdAtMax: isoDate('createdAtMax').optional(),
    updatedAtMin: isoDate('updatedAtMin').optional(),
    updatedAtMax: isoDate('updatedAtMax').optional(),
    includePrivate,
    search,
    orderBy,
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
  authUserId: string;
};

export type ProjectReadInput = ProjectRead['params'] & {
  authUserId: string;
};

export type ProjectListInput = ProjectList['query'] & {
  authUserId: string;
};

export type ProjectUpdateInput = ProjectUpdate['body'] & {
  id: string;
  authUserId: string;
};

export type ProjectUpdateIsArchivedInput = ProjectUpdateIsArchived['body'] & {
  id: string;
  authUserId: string;
};

export type ProjectDeleteInput = ProjectDelete['params'] & {
  authUserId: string;
};

export type ProjectEntries = ProjectCreate['body'] & {
  authUserId: string;
};

export type ProjectChanges = Partial<{
  name: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  description: string;
  coverImage: string;
  startDate: Date;
  endDate: Date;
  isPublic: boolean;
  archivedAt: Date | null;
  completedAt: Date | null;
  authUserId: string;
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
