import {
  CreateProjectBodyDTO,
  ProjectQueryDTO,
  UpdateProjectBodyDTO,
} from '@/dtos/project/project.input';
import {
  ProjectResponseDTO,
  toProjectResponseDTO,
} from '@/dtos/project/project.output.dto';
import { IProjectRepository } from '@/interfaces/repositories/i-project-repository';
import { IProjectService } from '@/interfaces/services/i-project-service';
import { IUserService } from '@/interfaces/services/i-user-service';
import { ForbiddenError, NotFoundError } from '@/utils/app-error';

export class ProjectService implements IProjectService {
  constructor(
    private projectRepo: IProjectRepository,
    private service: IUserService,
  ) {}

  async getAll(
    authorId: string,
    dto: ProjectQueryDTO,
  ): Promise<ProjectResponseDTO[]> {
    const persistedProjects = await this.projectRepo.findAllWithQuery({
      authorId,
      includeArchived: dto.includeArchived || false,
    });

    return persistedProjects.map(toProjectResponseDTO);
  }

  async getById(id: string, authorId: string): Promise<ProjectResponseDTO> {
    const persistedProject = await this.projectRepo.findById(id);

    if (!persistedProject) {
      throw new NotFoundError(`Project not found`);
    }

    if (persistedProject.authorId !== authorId) {
      throw new ForbiddenError(`Project access denied`);
    }

    return toProjectResponseDTO(persistedProject);
  }

  async create(
    authorId: string,
    dto: CreateProjectBodyDTO,
  ): Promise<ProjectResponseDTO> {
    await this.service.getById(authorId);

    const createdProject = await this.projectRepo.create({
      ...dto,
      authorId,
    });

    return toProjectResponseDTO(createdProject);
  }

  async update(
    id: string,
    authorId: string,
    dto: UpdateProjectBodyDTO,
  ): Promise<ProjectResponseDTO> {
    await this.getById(id, authorId);

    const updatedProject = await this.projectRepo.update(id, {
      ...dto,
      authorId,
    });

    return toProjectResponseDTO(updatedProject);
  }

  async delete(authorId: string, id: string): Promise<void> {
    await this.getById(id, authorId);

    await this.projectRepo.delete(id);
  }

  async archive(
    id: string,
    authorId: string,
    isArchived: boolean,
  ): Promise<ProjectResponseDTO> {
    await this.getById(id, authorId);

    const updatedProject = await this.projectRepo.update(id, { isArchived });

    return toProjectResponseDTO(updatedProject);
  }
}
