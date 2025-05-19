import { IRefreshTokenRepository } from '../repositories/i-refresh-token-repository';
import { IProjectRepository } from '../repositories/i-project-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { IAuthService } from './i-auth-service';
import { IUserService } from './i-user-service';
import { IProjectService } from './i-project-service';

export interface IServiceFactory {
  newIAuthService(
    refreshTokenRepo: IRefreshTokenRepository,
    repo: IUserRepository,
    service: IUserService,
  ): IAuthService;

  newIUserService(repo: IUserRepository): IUserService;

  newIProjectService(
    repo: IProjectRepository,
    service: IUserService,
  ): IProjectService;
}
