import { IRepositoryFactory } from '../interfaces/repositories/i-repository-factory';
import { IRefreshTokenRepository } from '../interfaces/repositories/i-refresh-token-repository';
import { IUserRepository } from '../interfaces/repositories/i-user-repository';
import { IProjectRepository } from '../interfaces/repositories/i-project-repository';
import { PrismaUserRepository } from './prisma-user-repository';
import { PrismaRefreshTokenRepository } from '../repositories/prisma-refresh-token.repository';
import { PrismaProjectRepository } from '../repositories/prisma-project.repository';

import { PrismaClient } from 'generated/prisma';

export class PrismaRepositoryFactory implements IRepositoryFactory {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  newIUserRepository(): IUserRepository {
    return new PrismaUserRepository(this.prisma);
  }

  newIProjectRepository(): IProjectRepository {
    return new PrismaProjectRepository(this.prisma);
  }

  newIRefreshTokenRepository(): IRefreshTokenRepository {
    return new PrismaRefreshTokenRepository(this.prisma);
  }
}
