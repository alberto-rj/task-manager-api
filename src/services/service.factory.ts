import { IAuthService } from '@/interfaces/services/i-auth-service';
import { IUserService } from '@/interfaces/services/i-user-service';
import { IServiceFactory } from '@/interfaces/services/i-service-factory';
import { IProjectService } from '@/interfaces/services/i-project-service';
import { IUserRepository } from '@/interfaces/repositories/i-user-repository';
import { IProjectRepository } from '@/interfaces/repositories/i-project-repository';
import { IRefreshTokenRepository } from '@/interfaces/repositories/i-refresh-token-repository';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { ProjectService } from '@/services/project.service';

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
