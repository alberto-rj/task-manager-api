import { Project } from '@/prisma';

export type ProjectCreateInput = {
  name: string;
  description?: string;
  authorId: string;
};

export type ProjectUpdateInput = {
  name?: string;
  description?: string;
  isArchived?: boolean;
  authorId?: string;
};

export type ProjectFilterInput = {
  includeArchived: boolean;
  authorId: string;
};

export { Project };
