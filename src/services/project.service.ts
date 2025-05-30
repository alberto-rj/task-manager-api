import {
  ProjectCreateInput,
  ProjectReadInput,
  ProjectListInput,
  ProjectUpdateInput,
  ProjectDeleteInput,
  ProjectUpdateIsArchivedInput,
} from '@/dtos/project/project.input.dto';
import {
  ProjectOutput,
  ProjectPaginationOutput,
  toProjectOutput,
  toProjectPaginationOutput,
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

  async getAll(input: ProjectListInput): Promise<ProjectPaginationOutput> {
    const output = await this.projectRepo.findAll(input);
    return toProjectPaginationOutput(output, input);
  }

  async getById({ id, authorId }: ProjectReadInput): Promise<ProjectOutput> {
    const persistedProject = await this.projectRepo.findById({ id, authorId });

    if (!persistedProject) {
      throw new NotFoundError(`Project not found.`);
    }

    if (persistedProject.authorId !== authorId) {
      throw new ForbiddenError(`Project access denied.`);
    }

    return toProjectOutput(persistedProject);
  }

  async create(input: ProjectCreateInput): Promise<ProjectOutput> {
    await this.service.getById(input.authorId);

    const createdProject = await this.projectRepo.create(input);

    return toProjectOutput(createdProject);
  }

  async update({
    id,
    authorId,
    ...changes
  }: ProjectUpdateInput): Promise<ProjectOutput> {
    await this.getById({ id, authorId });

    const updatedProject = await this.projectRepo.update(id, {
      authorId,
      ...changes,
    });

    return toProjectOutput(updatedProject);
  }

  async delete({ id, authorId }: ProjectDeleteInput): Promise<void> {
    await this.getById({ id, authorId });

    await this.projectRepo.delete({ id, authorId });
  }

  async updateIsArchived({
    id,
    authorId,
    isArchived,
  }: ProjectUpdateIsArchivedInput): Promise<ProjectOutput> {
    await this.getById({ id, authorId });

    const archivedAt = isArchived ? new Date() : null;

    const updatedProject = await this.projectRepo.update(id, {
      isArchived,
      archivedAt,
    });

    return toProjectOutput(updatedProject);
  }
}
