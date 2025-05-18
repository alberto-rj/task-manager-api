import { NextFunction, Response } from 'express';

import {
  IAuthRequest,
  signinInputSchema,
  signupInputSchema,
} from '../dtos/auth.dto';
import { IUserService } from '../services/i-user.service';
import { ForbiddenError, UnauthorizedError } from '../utils/app-error';
import { verifyToken } from '../utils/jwt';
import { validateBody } from './validation.middleware';

export const newAuthMiddleware = (service: IUserService) => {
  const validateSignin = validateBody(signinInputSchema);

  const validateSignup = validateBody(signupInputSchema);

  const authenticate = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('No token provided');
      }

      const [, token] = authHeader.split(' ');

      const decoded = verifyToken(token);

      if (!decoded) {
        throw new UnauthorizedError('Invalid or expired token');
      }

      const filteredUser = await service.getById(decoded.id);

      req.user = filteredUser;

      next();
    } catch (error) {
      next(error);
    }
  };

  const authorize = (roles: string[] = []) => {
    return (req: IAuthRequest, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw new UnauthorizedError('Not authenticated');
        }

        if (roles.length === 0) {
          next();
          return;
        }

        // if (req.user.role && roles.includes(req.user.role)) {
        //   next();
        //   return;
        // }

        throw new ForbiddenError('Insufficient permissions');
      } catch (error) {
        next(error);
      }
    };
  };

  return {
    authenticate,
    authorize,
    validateSignin,
    validateSignup,
  };
};
