import {
  Project,
  ProjectCreateInput,
  ProjectUpdateInput,
} from '../models/project-model';

export interface IProjectRepository {
  create(data: ProjectCreateInput): Promise<Project>;

  findById(id: string): Promise<Project | null>;

  update(id: string, data: ProjectUpdateInput): Promise<Project>;

  delete(id: string): Promise<void>;
}
