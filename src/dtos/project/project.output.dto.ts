import { Project } from '@/models/project.model';

export type ProjectResponseDTO = {
  id: string;
  name: string;
  description: string | undefined;
  coverImage: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  isPublic: boolean;
  isArchived: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export const toProjectResponseDTO = (project: Project): ProjectResponseDTO => {
  return {
    ...project,
    description: project.description || undefined,
    coverImage: project.coverImage || undefined,
    startDate: project.startDate?.toISOString() || undefined,
    endDate: project.endDate?.toISOString() || undefined,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
};
