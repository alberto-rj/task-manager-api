import { IProjectRepository } from './i-project-repository';
import { IRefreshTokenRepository } from './i-refresh-token-repository';
import { IUserRepository } from './i-user-repository';

export interface IRepositoryFactory {
  newIProjectRepository(): IProjectRepository;

  newIRefreshTokenRepository(): IRefreshTokenRepository;

  newIUserRepository(): IUserRepository;
}
