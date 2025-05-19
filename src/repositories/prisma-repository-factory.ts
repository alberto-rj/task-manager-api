import { IRepositoryFactory } from '../repositories/i-repository-factory';
import { IRefreshTokenRepository } from './i-refresh-token-repository';
import { IUserRepository } from './i-user-repository';
import { IProjectRepository } from './i-project-repository';
import { PrismaUserRepository } from './prisma-user-repository';
import { PrismaRefreshTokenRepository } from '../repositories/prisma-refresh-token.repository';
import { PrismaProjectRepository } from '../repositories/prisma-project.repository';

import { PrismaClient } from 'generated/prisma';

export class PrismaRepositoryFactory implements IRepositoryFactory {
  constructor(private prisma: PrismaClient) {}

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
