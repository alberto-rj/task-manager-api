import { IRefreshTokenRepository } from '../repositories/i-refresh-token.repository';
import { IUserRepository } from '../repositories/i-user.repository';
import { PrismaUserRepository } from '../repositories/prisma-user.repository';
import { PrismaRefreshTokenRepository } from '../repositories/prisma-refresh-token.repository';

import prisma from '../config/prisma';

export abstract class RepositoryFactory {
  private constructor() {}

  static newIUserRepository(): IUserRepository {
    return new PrismaUserRepository(prisma);
  }

  static newIRefreshTokenRepository(): IRefreshTokenRepository {
    return new PrismaRefreshTokenRepository(prisma);
  }
}
