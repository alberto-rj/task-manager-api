import { IProjectRepository } from '../repositories/i-project-repository';
import {
  CreateProjectDTO,
  UpdateProjectDTO,
  ArchiveProjectDTO,
  toProjectMinimalDTO,
  ProjectMinimalDTO,
  GetProjectsDTO,
} from '../dtos/project.dto';
import { IProjectService } from './i-project-service';
import { IUserService } from './i-user-service';
import { ForbiddenError, NotFoundError } from '../utils/app-error';

export class ProjectService implements IProjectService {
  constructor(
    private projectRepo: IProjectRepository,
    private service: IUserService,
  ) {}

  // async getAll(authorId: string, dto: GetProjectsDTO): Promise<ProjectMinimalDTO[]> {
  //   const persistedProject = await this.projectRepo.findAll()
  // }

  async getById(id: string, authorId: string): Promise<ProjectMinimalDTO> {
    const persistedProject = await this.projectRepo.findById(id);

    if (!persistedProject) {
      throw new NotFoundError(`Project not found`);
    }

    if (persistedProject.authorId !== authorId) {
      throw new ForbiddenError(`Project access denied`);
    }

    return toProjectMinimalDTO(persistedProject);
  }

  async create(
    authorId: string,
    dto: CreateProjectDTO,
  ): Promise<ProjectMinimalDTO> {
    await this.service.getById(authorId);

    const createdProject = await this.projectRepo.create({
      ...dto,
      authorId,
    });

    return toProjectMinimalDTO(createdProject);
  }

  async update(
    id: string,
    authorId: string,
    dto: UpdateProjectDTO,
  ): Promise<ProjectMinimalDTO> {
    await this.getById(id, authorId);

    const updatedProject = await this.projectRepo.update(id, {
      ...dto,
      authorId,
    });

    return toProjectMinimalDTO(updatedProject);
  }

  async delete(authorId: string, id: string): Promise<void> {
    await this.getById(id, authorId);

    await this.projectRepo.delete(id);
  }

  async archive(
    id: string,
    authorId: string,
    dto: ArchiveProjectDTO,
  ): Promise<ProjectMinimalDTO> {
    await this.getById(id, authorId);

    const updatedProject = await this.projectRepo.update(id, dto);

    return toProjectMinimalDTO(updatedProject);
  }
}
