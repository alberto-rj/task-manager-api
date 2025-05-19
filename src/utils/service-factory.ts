import { IServiceFactory } from '../services/i-service-factory';
import { ServiceFactory as ServiceFactoryImpl } from '../services/service-factory';

export class ServiceFactory {
  private constructor() {}

  static newInstance(): IServiceFactory {
    return new ServiceFactoryImpl();
  }
}

export const serviceFactory = ServiceFactory.newInstance();
export const newIAuthService = serviceFactory.newIAuthService;
export const newIProjectService = serviceFactory.newIProjectService;
export const newIUserService = serviceFactory.newIUserService;
