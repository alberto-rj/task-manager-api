import { IRefreshTokenRepository } from '../repositories/i-refresh-token-repository';
import { IUserRepository } from '../repositories/i-user-repository';
import { AuthService } from './auth-service';
import { IAuthService } from './i-auth-service';
import { IUserService } from './i-user-service';
import { UserService } from './user-service';
import { IServiceFactory } from './i-service-factory';
import { IProjectRepository } from '../repositories/i-project-repository';
import { IProjectService } from './i-project-service';
import { ProjectService } from './project-service';

export class ServiceFactory implements IServiceFactory {
  newIAuthService(
    refreshTokenRepo: IRefreshTokenRepository,
    repo: IUserRepository,
    service: IUserService,
  ): IAuthService {
    return new AuthService(refreshTokenRepo, repo, service);
  }

  newIUserService(repo: IUserRepository): IUserService {
    return new UserService(repo);
  }

  newIProjectService(
    repo: IProjectRepository,
    service: IUserService,
  ): IProjectService {
    return new ProjectService(repo, service);
  }
}
