import { PrismaClient } from '@/prisma';
import { Project } from '@/models/project.model';
import { IProjectRepository } from '@/interfaces/repositories/i-project-repository';
import {
  ProjectChanges,
  ProjectDeleteInput,
  ProjectEntries,
  ProjectListInput,
  ProjectReadInput,
} from '@/dtos/project/project.input.dto';
import { ProjectListOutput } from '@/dtos/project/project.output.dto';

export class PrismaProjectRepository implements IProjectRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(query: ProjectListInput): Promise<ProjectListOutput> {
    const persistedProjects = await this.prisma.project.findMany({ take: 20 });
    return persistedProjects;
  }

  async findById(input: ProjectReadInput): Promise<Project | null> {
    const persistedProject = await this.prisma.project.findUnique({
      where: { id: input.id },
    });

    return persistedProject;
  }

  async create(data: ProjectEntries): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  async update(id: string, data: ProjectChanges): Promise<Project> {
    const updatedProject = await this.prisma.project.update({
      data,
      where: { id },
    });

    return updatedProject;
  }

  async delete(input: ProjectDeleteInput): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }
}
