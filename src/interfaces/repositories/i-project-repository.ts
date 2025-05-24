import {
  Project,
  ProjectCreateInput,
  ProjectFilterInput,
  ProjectUpdateInput,
} from '@/models/project-model';

export interface IProjectRepository {
  findAllWithFilters(filters: ProjectFilterInput): Promise<Project[]>;

  findById(id: string): Promise<Project | null>;

  create(data: ProjectCreateInput): Promise<Project>;

  update(id: string, data: ProjectUpdateInput): Promise<Project>;

  delete(id: string): Promise<void>;
}
