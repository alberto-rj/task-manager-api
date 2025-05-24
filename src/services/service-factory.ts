import { IRefreshTokenRepository } from '../interfaces/repositories/i-refresh-token-repository';
import { IUserRepository } from '../interfaces/repositories/i-user-repository';
import { AuthService } from './auth-service';
import { IAuthService } from '../interfaces/services/i-auth-service';
import { IUserService } from '../interfaces/services/i-user-service';
import { UserService } from './user-service';
import { IServiceFactory } from '../interfaces/services/i-service-factory';
import { IProjectRepository } from '../interfaces/repositories/i-project-repository';
import { IProjectService } from '../interfaces/services/i-project-service';
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
