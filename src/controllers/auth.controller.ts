import { NextFunction, Request, Response } from 'express';

import { toSigninInput, toSignupInput } from '../dtos/auth.dto';
import { IAuthService } from '../services/i-auth.service';
import { auth } from '../utils/response-body';

export const newAuthController = (service: IAuthService) => {
  const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = toSigninInput(req.body);
      const output = await service.signin(input);

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
    signin,
    signup,
  };
};
