import { IUserRepository } from '@/interfaces/repositories/i-user-repository';
import {
  CreateUserBodyDTO,
  UpdateUserDTO,
  UserIdentifiersDTO,
} from '@/dtos/user/user.input.dto';
import { User } from '@/models/user.model';
import { PrismaClient } from '@/prisma';
import { hashPassword } from '@/utils/password-security';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
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

  async create(data: CreateUserBodyDTO): Promise<User> {
    const hashedPassword = await hashPassword(data.password);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
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
}
