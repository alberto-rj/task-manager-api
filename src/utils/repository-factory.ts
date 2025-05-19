import prisma from '../config/prisma';
import { IRepositoryFactory } from '../repositories/i-repository-factory';
import { PrismaRepositoryFactory } from '../repositories/prisma-repository-factory';

export abstract class RepositoryFactory {
  private constructor() {}

  static newInstance(options?: { type: 'prisma' }): IRepositoryFactory {
    return new PrismaRepositoryFactory(prisma);
  }
}

export const newInstance = RepositoryFactory.newInstance;

export const repositoryFactory = RepositoryFactory.newInstance();

export const newIRefreshTokenRepository =
  repositoryFactory.newIRefreshTokenRepository;

export const newIProjectRepository = repositoryFactory.newIProjectRepository;

export const newIUserRepository = repositoryFactory.newIUserRepository;
