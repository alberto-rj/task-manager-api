import { NextFunction, Request, Response } from 'express';

import { env } from '../config/env';
import {
  toRefreshTokenInput,
  toSigninInput,
  toSignupInput,
} from '../dtos/auth.dto';
import { IAuthService } from '../services/i-auth-service';
import { auth } from '../utils/response-body';

export const newAuthController = (service: IAuthService) => {
  const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.isProduction(),
      sameSite: 'strict',
      maxAge: env.refreshTokenExpiresInDays * 24 * 60 * 60 * 1000,
    });
  };

  const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = toRefreshTokenInput(req.cookies);
      await service.logout(input);
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
      const input = toRefreshTokenInput(req.cookies);

      const output = await service.refreshToken(input);

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

  const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = toSigninInput(req.body);
      const output = await service.signin(input);

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

  const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = toSignupInput(req.body);
      const output = await service.signup(input);

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
    logout,
    refreshToken,
    signin,
    signup,
  };
};
