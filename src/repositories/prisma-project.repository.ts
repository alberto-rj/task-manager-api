import { PrismaClient } from '@/prisma';
import { Project } from '@/models/project.model';
import { IProjectRepository } from '@/interfaces/repositories/i-project-repository';
import {
  ProjectChangesDTO,
  ProjectEntriesDTO,
  ProjectQueryDTO,
} from '@/dtos/project/project.input';

export class PrismaProjectRepository implements IProjectRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAllWithQuery(query: ProjectQueryDTO): Promise<Project[]> {
    const persistedProjects = await this.prisma.project.findMany({ take: 20 });
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

  async create(data: ProjectEntriesDTO): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  async update(id: string, data: ProjectChangesDTO): Promise<Project> {
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
