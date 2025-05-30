import { NextFunction, Response } from 'express';

import { UserRole } from '@/models/user.model';
import { IUserService } from '@/interfaces/services/i-user-service';
import { IAuthRequest } from '@/types/i-auth-request';
import { ForbiddenError, UnauthorizedError } from '@/utils/app-error';
import { verifyToken } from '@/utils/jwt';

export const newAuthMiddleware = (userService: IUserService) => {
  const authenticate = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('No access token provided');
      }

      const [, token] = authHeader.split(' ');

      const decoded = verifyToken(token);

      if (!decoded) {
        throw new UnauthorizedError('Invalid or expired access token');
      }

      await userService.getById(decoded.id);

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };

  const authorize = (roles: UserRole[] = []) => {
    return (req: IAuthRequest, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw new UnauthorizedError('Not authenticated.');
        }

        if (roles.length === 0) {
          next();
          return;
        }

        if (req.user.role && roles.includes(req.user.role)) {
          next();
          return;
        }

        throw new ForbiddenError('Insufficient permissions.');
      } catch (error) {
        next(error);
      }
    };
  };

  return {
    authenticate,
    authorize,
  };
};
