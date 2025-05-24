import { IProjectRepository } from '@/interfaces/repositories/i-project-repository';
import { IRefreshTokenRepository } from '@/interfaces/repositories/i-refresh-token-repository';
import { IUserRepository } from '@/interfaces/repositories/i-user-repository';

export interface IRepositoryFactory {
  newIProjectRepository(): IProjectRepository;

  newIRefreshTokenRepository(): IRefreshTokenRepository;

  newIUserRepository(): IUserRepository;
}
