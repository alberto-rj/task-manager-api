import { NextFunction, Request, Response } from 'express';

import env from '@/config/env';
import { toLoginDTO, toRefreshTokenDTO } from '@/dtos/auth/auth.input.dto';
import { IAuthService } from '@/interfaces/services/i-auth-service';
import { auth } from '@/utils/response-body';
import { toCreateUserDTO } from '@/dtos/user/user.input.dto';

export const newAuthController = (service: IAuthService) => {
  const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.isProduction(),
      sameSite: 'strict',
      maxAge: env.auth.refreshTokenExpiresInDays * 24 * 60 * 60 * 1000,
    });
  };

  const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = toLoginDTO(req);

      const output = await service.login(body);

      setRefreshTokenCookie(res, output.refreshToken);

      res.status(200).json(
        auth<typeof output.user>({
          accessToken: output.accessToken,
          user: output.user,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        cookies: { refreshToken },
      } = toRefreshTokenDTO(req);

      await service.logout(refreshToken);

      res.clearCookie('refreshToken');
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        cookies: { refreshToken },
      } = toRefreshTokenDTO(req);

      const output = await service.refreshToken(refreshToken);

      setRefreshTokenCookie(res, output.refreshToken);

      res.status(200).json(
        auth<typeof output.user>({
          accessToken: output.accessToken,
          user: output.user,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = toCreateUserDTO(req);

      const output = await service.register(body);

      setRefreshTokenCookie(res, output.refreshToken);

      res.status(201).json(
        auth<typeof output.user>({
          accessToken: output.accessToken,
          user: output.user,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
    logout,
    refreshToken,
    register,
  };
};
