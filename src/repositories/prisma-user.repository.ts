import { CreateUserInput, UpdateUserInput } from '../dtos/user.dto';

import { IUserRepository } from './i-user.repository';

import { User } from '../models/user.model';
import prisma from '../config/prisma';

export class PrismaUserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });
  }

  async findAllByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User[]> {
    return prisma.user.findMany({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }

  async create(data: CreateUserInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    prisma.user.delete({ where: { id } });
  }
}
