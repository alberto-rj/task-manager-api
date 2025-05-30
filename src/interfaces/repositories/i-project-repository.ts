import {
  ProjectChanges,
  ProjectDeleteInput,
  ProjectEntries,
  ProjectListInput,
  ProjectReadInput,
} from '@/dtos/project/project.input.dto';
import { ProjectListOutput } from '@/dtos/project/project.output.dto';

import { Project } from '@/models/project.model';

export interface IProjectRepository {
  findAll(input: ProjectListInput): Promise<ProjectListOutput>;

  findById(input: ProjectReadInput): Promise<Project | null>;

  create(data: ProjectEntries): Promise<Project>;

  update(id: string, data: ProjectChanges): Promise<Project>;

  delete(input: ProjectDeleteInput): Promise<void>;
}
