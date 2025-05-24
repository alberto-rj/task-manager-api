import { PrismaClient } from '@/prisma';
import {
  Project,
  ProjectCreateInput,
  ProjectFilterInput,
  ProjectUpdateInput,
} from '@/models/project-model';
import { IProjectRepository } from '@/interfaces/repositories/i-project-repository';

export class PrismaProjectRepository implements IProjectRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAllWithPagination(
    filters: ProjectFilterInput,
    pagination: any,
  ): Promise<void> {}

  async findAllWithFilters({
    authorId,
    includeArchived,
  }: ProjectFilterInput): Promise<Project[]> {
    const query: Record<string, any> = { authorId };

    if (!includeArchived) {
      query.isArchived = false;
    }

    const persistedProjects = await this.prisma.project.findMany({
      where: {
        ...query,
      },
    });

    return persistedProjects;
  }

  async findAllByIsArchived(isArchived: boolean): Promise<Project[]> {
    const persistedProjects = await this.prisma.project.findMany({
      where: { isArchived },
    });

    return persistedProjects;
  }

  async findById(id: string): Promise<Project | null> {
    const persistedProject = await this.prisma.project.findUnique({
      where: { id },
    });

    return persistedProject;
  }

  async create(data: ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  async update(id: string, data: ProjectUpdateInput): Promise<Project> {
    const updatedProject = await this.prisma.project.update({
      data,
      where: { id },
    });

    return updatedProject;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }
}
