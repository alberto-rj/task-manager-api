import { Project } from '../models/project-model';
import {
  ArchiveProjectRIO,
  CreateProjectRIO,
  GetProjectsRIO,
  UpdateProjectRIO,
} from '../validators/project-validator';

export type CreateProjectDTO = CreateProjectRIO['body'];

export type UpdateProjectDTO = UpdateProjectRIO['body'];

// archive project dto - begin
export type ArchiveProjectDTO = ArchiveProjectRIO['body'];
// archive project dto - end

export type GetProjectsDTO = GetProjectsRIO['query'];

// project response dto - begin
export type ProjectMinimalDTO = Omit<Project, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export function toProjectMinimalDTO(project: Project): ProjectMinimalDTO {
  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}
// project response dto - end

// project response dto - begin
export type ProjectResponseDTO = {};
// project response dto - end

// project detailed dto - begin
export type ProjectDetailedDTO = {};
// project detailed dto - end
