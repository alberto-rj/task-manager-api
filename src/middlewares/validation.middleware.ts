import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

import { validate } from '../utils/validate';

export const validateBody = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = validate(schema, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateParams = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = validate(schema, req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateQuery = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = validate(schema, req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateRequest = (schemas: {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = validate(schemas.body, req.body);
      }

      if (schemas.params) {
        req.params = validate(schemas.params, req.params);
      }

      if (schemas.query) {
        req.query = validate(schemas.query, req.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
