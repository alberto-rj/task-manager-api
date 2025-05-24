import prisma from '../config/prisma';
import { IRepositoryFactory } from '../interfaces/repositories/i-repository-factory';
import { PrismaRepositoryFactory } from '../repositories/prisma-repository-factory';

export abstract class RepositoryFactory {
  private constructor() {}

  static newInstance(options?: { type: 'prisma' }): IRepositoryFactory {
    return new PrismaRepositoryFactory(prisma);
  }
}

export const newInstance = () => {
  return RepositoryFactory.newInstance();
};

export const repositoryFactory = newInstance();

export const newIRefreshTokenRepository = () => {
  return repositoryFactory.newIRefreshTokenRepository();
};

export const newIProjectRepository = () => {
  return repositoryFactory.newIProjectRepository();
};

export const newIUserRepository = () => {
  return repositoryFactory.newIUserRepository();
};
