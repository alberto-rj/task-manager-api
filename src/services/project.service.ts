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

  async create({
    authUserId,
    ...input
  }: ProjectCreateInput): Promise<ProjectOutput> {
    await this.service.getById(authUserId);

    const createdProject = await this.projectRepo.create({
      authUserId,
      ...input,
    });

    return toProjectOutput(createdProject);
  }

  async getById({ id, authUserId }: ProjectReadInput): Promise<ProjectOutput> {
    const persistedProject = await this.projectRepo.findById(id);

    if (!persistedProject) {
      throw new NotFoundError(`Project not found.`);
    }

    if (persistedProject.authorId !== authUserId) {
      throw new ForbiddenError(`Project access denied.`);
    }

    return toProjectOutput(persistedProject);
  }

  async getAll(input: ProjectListInput): Promise<ProjectPaginationOutput> {
    const output = await this.projectRepo.findAll(input);
    return toProjectPaginationOutput(output, input);
  }

  async update({
    id,
    authUserId,
    ...changes
  }: ProjectUpdateInput): Promise<ProjectOutput> {
    await this.getById({ id, authUserId });

    const updatedProject = await this.projectRepo.update(id, {
      authUserId,
      ...changes,
    });

    return toProjectOutput(updatedProject);
  }

  async updateIsArchived({
    id,
    authUserId,
    isArchived,
  }: ProjectUpdateIsArchivedInput): Promise<ProjectOutput> {
    await this.getById({ id, authUserId });

    const archivedAt = isArchived ? new Date() : null;

    const updatedProject = await this.projectRepo.update(id, {
      isArchived,
      archivedAt,
    });

    return toProjectOutput(updatedProject);
  }

  async delete({ id, authUserId }: ProjectDeleteInput): Promise<void> {
    await this.getById({ id, authUserId });

    await this.projectRepo.delete(id);
  }
}
