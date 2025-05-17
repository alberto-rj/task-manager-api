import { IUserRepository } from '../repositories/i-user.repository';
import { PrismaUserRepository } from '../repositories/prisma-user.repository';

export abstract class RepositoryFactory {
  private constructor() {}

  static newIUserRepository(): IUserRepository {
    return new PrismaUserRepository();
  }
}
