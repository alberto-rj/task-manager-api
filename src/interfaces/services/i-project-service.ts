import {
  ArchiveProjectDTO,
  CreateProjectDTO,
  GetProjectsDTO,
  ProjectMinimalDTO,
  UpdateProjectDTO,
} from '@/dtos/project.dto';

export interface IProjectService {
  getAll(authorId: string, dto: GetProjectsDTO): Promise<ProjectMinimalDTO[]>;

  getById(id: string, authorId: string): Promise<ProjectMinimalDTO>;

  create(authorId: string, dto: CreateProjectDTO): Promise<ProjectMinimalDTO>;

  update(
    id: string,
    authorId: string,
    dto: UpdateProjectDTO,
  ): Promise<ProjectMinimalDTO>;

  delete(id: string, authorId: string): Promise<void>;

  archive(
    id: string,
    authorId: string,
    dto: ArchiveProjectDTO,
  ): Promise<ProjectMinimalDTO>;
}
