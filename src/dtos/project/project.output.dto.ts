import { Project } from '@/models/project.model';
import { toPaginationOutput } from '@/dtos/common/common.output.dto';
import { ProjectListInput } from '@/dtos/project/project.input.dto';

export type ProjectOutput = {
  id: string;
  name: string;
  isPublic: boolean;
  isArchived: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
} & Partial<{
  description: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  archivedAt: string;
}>;

export type ProjectPaginationOutput = {
  total: number;
  limit: number;
  page: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
  resources: ProjectOutput[];
};

export type ProjectListOutput = {
  total: number;
  resources: Project[];
};

export const toProjectOutput = (project: Project): ProjectOutput => {
  return {
    ...project,
    description: project.description || undefined,
    coverImage: project.coverImage || undefined,
    startDate: project.startDate?.toISOString() || undefined,
    endDate: project.endDate?.toISOString() || undefined,
    archivedAt: project.archivedAt?.toISOString() || undefined,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
};

export const toProjectPaginationOutput = (
  { resources, total }: ProjectListOutput,
  { limit, page }: ProjectListInput,
): ProjectPaginationOutput => {
  const newProjects = resources.map(toProjectOutput);

  return toPaginationOutput<typeof newProjects>({
    total,
    limit,
    page,
    resources: newProjects,
  });
};
