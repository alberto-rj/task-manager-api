import { RefreshToken } from '../../models/refresh-token-model';

export interface IRefreshTokenRepository {
  create(data: {
    token: string;
    userId: string;
    expiresAt: Date;
  }): Promise<RefreshToken>;

  findByToken(token: string): Promise<RefreshToken | null>;

  deleteByToken(token: string): Promise<void>;

  deleteAllById(userId: string): Promise<void>;
}
