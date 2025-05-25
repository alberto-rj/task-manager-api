import {
  ProjectChangesDTO,
  ProjectEntriesDTO,
  ProjectQueryDTO,
} from '@/dtos/project/project.input';

import { Project } from '@/models/project.model';

export interface IProjectRepository {
  findAllWithQuery(query: ProjectQueryDTO): Promise<Project[]>;

  findById(id: string): Promise<Project | null>;

  create(data: ProjectEntriesDTO): Promise<Project>;

  update(id: string, data: ProjectChangesDTO): Promise<Project>;

  delete(id: string): Promise<void>;
}
