import { PrismaClient } from '@/prisma';
import { Project } from '@/models/project.model';
import { IProjectRepository } from '@/interfaces/repositories/i-project-repository';
import {
  ProjectChanges,
  ProjectEntries,
  ProjectListInput,
} from '@/dtos/project/project.input.dto';
import { ProjectListOutput } from '@/dtos/project/project.output.dto';

export class PrismaProjectRepository implements IProjectRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll({
    name,
    status,
    priority,
    startDateMin,
    startDateMax,
    endDateMin,
    endDateMax,
    createdAtMin,
    createdAtMax,
    updatedAtMin,
    updatedAtMax,
    search,
    authUserId,
    includePrivate,
    orderBy: sort,
    sortOrder,
    limit,
    page,
  }: ProjectListInput): Promise<ProjectListOutput> {
    const take = limit;
    const skip = limit * page;
    const isPublic = includePrivate ? undefined : true;
    const authorId = authUserId;

    const [total, persistedProjects] = await Promise.all([
      this.prisma.project.count({
        where: { isPublic, authorId },
      }),
      this.prisma.project.findMany({
        where: {
          name,
          status,
          priority,
          isPublic,
          authorId,
          startDate: {
            gte: startDateMin,
            lte: startDateMax,
          },
          endDate: {
            gte: endDateMin,
            lte: endDateMax,
          },
          createdAt: {
            gte: createdAtMin,
            lte: createdAtMax,
          },
          updatedAt: {
            gte: updatedAtMin,
            lte: updatedAtMax,
          },
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
        take,
        skip,
        orderBy: {
          [sort]: sortOrder,
        },
      }),
    ]);

    return { total, resources: persistedProjects };
  }

  async findById(id: string): Promise<Project | null> {
    const persistedProject = await this.prisma.project.findUnique({
      where: { id },
    });

    return persistedProject;
  }

  async create({ authUserId, ...data }: ProjectEntries): Promise<Project> {
    return this.prisma.project.create({
      data: { ...data, authorId: authUserId },
    });
  }

  async update(id: string, data: ProjectChanges): Promise<Project> {
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
