import { IUserRepository } from '../repositories/i-user.repository';
import {
  SignupInput,
  SignupOutput,
  SigninInput,
  SigninOutput,
  toIUserPayload,
} from '../dtos/auth.dto';
import { IAuthService } from './i-auth.service';
import { IUserService } from './i-user.service';
import { NotFoundError } from '../utils/app-error';
import { verifyPassword } from '../utils/password-security';
import { generateAccessToken } from '../utils/jwt';
import { toUserOutput } from '../dtos/user.dto';

export class AuthService implements IAuthService {
  private repo: IUserRepository;
  private service: IUserService;

  constructor(repo: IUserRepository, service: IUserService) {
    this.repo = repo;
    this.service = service;
  }

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

    const userOutput = toUserOutput(filteredUser);
    const accessToken = generateAccessToken(toIUserPayload(filteredUser));

    return {
      user: userOutput,
      accessToken,
    };
  }

  async signup(data: SignupInput): Promise<SignupOutput> {
    const createdUser = await this.service.create(data);

    const accessToken = generateAccessToken(toIUserPayload(createdUser));

    return {
      user: createdUser,
      accessToken,
    };
  }
}
