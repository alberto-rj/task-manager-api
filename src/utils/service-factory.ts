import { IRefreshTokenRepository } from '../interfaces/repositories/i-refresh-token-repository';
import { IUserRepository } from '../interfaces/repositories/i-user-repository';
import { IUserService } from '../interfaces/services/i-user-service';
import { IServiceFactory } from '../interfaces/services/i-service-factory';
import { ServiceFactory as ServiceFactoryImpl } from '../services/service.factory';
import { IProjectRepository } from '../interfaces/repositories/i-project-repository';

export class ServiceFactory {
  private constructor() {}

  static newInstance(): IServiceFactory {
    return new ServiceFactoryImpl();
  }
}

export const newInstance = () => {
  return ServiceFactory.newInstance();
};

export const serviceFactory = newInstance();

export const newIAuthService = (
  refreshTokenRepo: IRefreshTokenRepository,
  repo: IUserRepository,
  service: IUserService,
) => {
  return serviceFactory.newIAuthService(refreshTokenRepo, repo, service);
};

export const newIProjectService = (
  repo: IProjectRepository,
  service: IUserService,
) => {
  return serviceFactory.newIProjectService(repo, service);
};

export const newIUserService = (repo: IUserRepository) => {
  return serviceFactory.newIUserService(repo);
};
