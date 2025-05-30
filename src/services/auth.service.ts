import env from '@/config/env';
import { IUserRepository } from '@/interfaces/repositories/i-user-repository';
import { LoginBodyDTO } from '@/dtos/auth/auth.input.dto';
import { IAuthService } from '@/interfaces/services/i-auth-service';
import { IUserService } from '@/interfaces/services/i-user-service';
import { NotFoundError, UnauthorizedError } from '@/utils/app-error';
import { verifyPassword } from '@/utils/password-security';
import { generateAccessToken, generateRefreshToken } from '@/utils/jwt';
import { IRefreshTokenRepository } from '@/interfaces/repositories/i-refresh-token-repository';
import { toUserResponseDTO } from '@/dtos/user/user.output.dto';
import { AuthResponseDTO } from '@/dtos/auth/auth.output.dto';
import { CreateUserBodyDTO } from '@/dtos/user/user.input.dto';

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

  async refreshToken(token: string): Promise<AuthResponseDTO> {
    const persistedRefreshToken =
      await this.refreshTokenRepo.findByToken(token);

    if (!persistedRefreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    if (persistedRefreshToken.expiresAt < new Date()) {
      await this.refreshTokenRepo.deleteByToken(token);
      throw new UnauthorizedError('Refresh token expired');
    }

    const user = await this.userRepo.findById(persistedRefreshToken.userId);

    if (!user) {
      await this.refreshTokenRepo.deleteByToken(token);
      throw new NotFoundError('User not found');
    }

    const accessToken = generateAccessToken({ id: user.id });

    await this.refreshTokenRepo.deleteByToken(token);
    const newRefreshToken = await this.createNewRefreshToken(user.id);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      user: toUserResponseDTO(user),
    };
  }

  async login(data: LoginBodyDTO): Promise<AuthResponseDTO> {
    const persistedUser = await this.userRepo.findByIdentifier(data.identifier);

    const error = new NotFoundError('Identifier or password do not match');

    if (!persistedUser) {
      throw error;
    }

    if (!persistedUser.isActive) {
      throw error;
    }

    const hasVerifiedPassword = await verifyPassword(
      data.password,
      persistedUser.password,
    );

    if (!hasVerifiedPassword) {
      throw error;
    }

    const refreshToken = await this.createNewRefreshToken(persistedUser.id);

    const updatedUser = await this.userRepo.update(persistedUser.id, {
      lastLoginAt: new Date(),
    });

    const accessToken = generateAccessToken({ id: updatedUser.id });

    return {
      user: toUserResponseDTO(updatedUser),
      refreshToken,
      accessToken,
    };
  }

  async register(data: CreateUserBodyDTO): Promise<AuthResponseDTO> {
    const createdUser = await this.userService.create(data);

    const accessToken = generateAccessToken({ id: createdUser.id });
    const refreshToken = await this.createNewRefreshToken(createdUser.id);

    return {
      user: createdUser,
      accessToken,
      refreshToken,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.refreshTokenRepo.deleteByToken(refreshToken);
  }
}
