import { IUserRepository } from '@/interfaces/repositories/i-user-repository';
import {
  SignupInput,
  SignupOutput,
  SigninInput,
  SigninOutput,
  toIUserPayload,
  RefreshTokenInput,
  RefreshTokenOutput,
} from '@/dtos/auth.dto';
import { IAuthService } from '@/interfaces/services/i-auth-service';
import { IUserService } from '@/interfaces/services/i-user-service';
import { NotFoundError, UnauthorizedError } from '@/utils/app-error';
import { verifyPassword } from '@/utils/password-security';
import { generateAccessToken, generateRefreshToken } from '@/utils/jwt';
import { toUserOutput } from '@/dtos/user.dto';
import { IRefreshTokenRepository } from '@/interfaces/repositories/i-refresh-token-repository';
import env from '@/config/env';

export class AuthService implements IAuthService {
  private userRepo: IUserRepository;
  private refreshTokenRepo: IRefreshTokenRepository;
  private userService: IUserService;

  constructor(
    refreshTokenRepo: IRefreshTokenRepository,
    userRepo: IUserRepository,
    userService: IUserService,
  ) {
    this.refreshTokenRepo = refreshTokenRepo;
    this.userRepo = userRepo;
    this.userService = userService;
  }

  private createRefreshTokenExpiry(): Date {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + env.auth.refreshTokenExpiresInDays);
    return expiresAt;
  }

  private async createNewRefreshToken(userId: string): Promise<string> {
    const refreshToken = generateRefreshToken();
    const expiresAt = this.createRefreshTokenExpiry();

    await this.refreshTokenRepo.create({
      token: refreshToken,
      userId,
      expiresAt,
    });

    return refreshToken;
  }

  async refreshToken(data: RefreshTokenInput): Promise<RefreshTokenOutput> {
    const persistedRefreshToken = await this.refreshTokenRepo.findByToken(
      data.refreshToken,
    );

    if (!persistedRefreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    if (persistedRefreshToken.expiresAt < new Date()) {
      await this.refreshTokenRepo.deleteByToken(data.refreshToken);
      throw new UnauthorizedError('Refresh token expired');
    }

    const user = await this.userRepo.findById(persistedRefreshToken.userId);

    if (!user) {
      await this.refreshTokenRepo.deleteByToken(data.refreshToken);
      throw new NotFoundError('User not found');
    }

    const accessToken = generateAccessToken(toIUserPayload(user));

    await this.refreshTokenRepo.deleteByToken(data.refreshToken);
    const newRefreshToken = await this.createNewRefreshToken(user.id);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      user: toUserOutput(user),
    };
  }

  async signin(data: SigninInput): Promise<SigninOutput> {
    const filteredUser = await this.userRepo.findByIdentifier(data.identifier);

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
    const refreshToken = await this.createNewRefreshToken(filteredUser.id);

    return {
      user: userOutput,
      accessToken,
      refreshToken,
    };
  }

  async signup(data: SignupInput): Promise<SignupOutput> {
    const createdUser = await this.userService.create(data);

    const accessToken = generateAccessToken(toIUserPayload(createdUser));
    const refreshToken = await this.createNewRefreshToken(createdUser.id);

    return {
      user: createdUser,
      accessToken,
      refreshToken,
    };
  }

  async logout(data: RefreshTokenInput): Promise<void> {
    await this.refreshTokenRepo.deleteByToken(data.refreshToken);
  }
}
