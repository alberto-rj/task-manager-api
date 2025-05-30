import { IUserRepository } from '@/interfaces/repositories/i-user-repository';
import {
  UserEntriesDTO,
  UserChangesDTO,
  UserIdentifiersDTO,
  UserQueryDTO,
} from '@/dtos/user/user.input.dto';
import { User } from '@/models/user.model';
import { PrismaClient } from '@/prisma';
import { hashPassword } from '@/utils/password-security';
import { UserResult } from '@/types/user';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAllByQuery(query: UserQueryDTO): Promise<UserResult> {
    const result = query.includeMe
      ? this.findAllByQueryIncludeMe(query)
      : this.findAllByQueryExcludeMe(query);

    return result;
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });
  }

  async findAllWithSomeIdentifier({
    email,
    username,
  }: UserIdentifiersDTO): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }

  async create(data: UserEntriesDTO): Promise<User> {
    const hashedPassword = await hashPassword(data.password);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async update(id: string, data: UserChangesDTO): Promise<User> {
    const newPassword =
      typeof data.password === 'string'
        ? await hashPassword(data.password)
        : undefined;

    return this.prisma.user.update({
      data: { ...data, password: newPassword },
      where: { id },
    });
  }

  async delete(id: string): Promise<void> {
    this.prisma.user.delete({ where: { id } });
  }

  private async findAllByQueryIncludeMe({
    search,
    orderBy: sort,
    sortOrder: sortOrder,
    limit,
    page,
  }: UserQueryDTO): Promise<UserResult> {
    const total = await this.prisma.user.count();
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              mode: 'insensitive',
              contains: search,
            },
          },
          {
            lastName: {
              mode: 'insensitive',
              contains: search,
            },
          },
          {
            username: {
              mode: 'insensitive',
              contains: search,
            },
          },
          {
            email: {
              mode: 'insensitive',
              contains: search,
            },
          },
        ],
      },
      orderBy: {
        [sort]: sortOrder,
      },
      take: limit,
      skip: limit * (page - 1),
    });
    return { total, users };
  }

  async findAllByQueryExcludeMe({
    id,
    search,
    orderBy: sort,
    sortOrder: sortOrder,
    limit,
    page,
  }: UserQueryDTO): Promise<UserResult> {
    const total = await this.prisma.user.count();
    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: id,
            },
          },
          {
            OR: [
              {
                firstName: {
                  mode: 'insensitive',
                  contains: search,
                },
              },
              {
                lastName: {
                  mode: 'insensitive',
                  contains: search,
                },
              },
              {
                username: {
                  mode: 'insensitive',
                  contains: search,
                },
              },
              {
                email: {
                  mode: 'insensitive',
                  contains: search,
                },
              },
            ],
          },
        ],
      },
      orderBy: {
        [sort]: sortOrder,
      },
      take: limit,
      skip: limit * (page - 1),
    });

    return {
      total: total > 0 ? total - 1 : total,
      users,
    };
  }
}
