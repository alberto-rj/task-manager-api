import { IUserRepository } from '../repositories/i-user.repository';
import { AuthService } from '../services/auth.service';
import { IAuthService } from '../services/i-auth.service';
import { IUserService } from '../services/i-user.service';
import { UserService } from '../services/user.service';

export class ServiceFactory {
  private constructor() {}

  static newIUserService(repo: IUserRepository): IUserService {
    return new UserService(repo);
  }

  static newIAuthService(
    repo: IUserRepository,
    service: IUserService,
  ): IAuthService {
    return new AuthService(repo, service);
  }
}
