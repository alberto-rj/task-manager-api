import { IUserRepository } from '../repositories/i-user.repository';
import {
  SignupInput,
  SignupOutput,
  SigninInput,
  SigninOutput,
} from '../dtos/auth.dto';
import { IAuthService } from './i-auth.service';
import { NotFoundError } from '../utils/app-error';
import { verifyPassword } from '../utils/password-hash';
import { IUserService } from './i-user.service';

export class AuthService implements IAuthService {
  constructor(
    private repo: IUserRepository,
    private service: IUserService,
  ) {}

  async signin(data: SigninInput): Promise<SigninOutput> {
    const filteredUser = await this.repo.findByIdentifier(data.identifier);

    const error = new NotFoundError('Identifier or password do not match');

    if (!filteredUser) {
      throw error;
    }

    const hasVerifiedPassword = await verifyPassword(
      data.password,
      filteredUser.password,
    );

    if (!hasVerifiedPassword) {
      throw error;
    }

    return filteredUser;
  }

  async signup(data: SignupInput): Promise<SignupOutput> {
    const response = await this.service.create(data);
    return {};
  }
}
