import { PrismaClient } from '@prisma/client';
import { IUserRepository } from './interfaces/i-user-repository';
import { IUser } from '@/models/user';
import { CreateUserDTO } from '@/dtos/requests/create-user-dto';
import { UpdateUserUserDTO } from '@/dtos/requests/update-user-dto';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<IUser[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(data: CreateUserDTO): Promise<IUser> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: UpdateUserUserDTO): Promise<IUser> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
