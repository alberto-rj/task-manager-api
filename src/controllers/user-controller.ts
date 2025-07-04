import { NextFunction, Response } from 'express';

import { IUserService } from '@/interfaces/services/i-user-service';
import { IAuthRequest } from '@/types/i-auth-request';
import { IAuthPayload } from '@/types/i-auth-payload';
import responseBody from '@/utils/response-body';
import {
  toReadUserDTO,
  toReadUsersDTO,
  toUpdateEmailDTO,
  toUpdateIsActiveDTO,
  toUpdateRoleDTO,
  toUpdateUserDTO,
  toUpdateUsernameDTO,
} from '@/dtos/user/user.input.dto';

export const newUserController = (service: IUserService) => {
  const getProfile = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = (req.user as IAuthPayload).id;
      const output = await service.getById(userId);

      res
        .status(200)
        .json(responseBody.record<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  const updateProfile = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = toUpdateUserDTO(req);

      const userId = (req.user as IAuthPayload).id;
      const output = await service.update(userId, body);

      res
        .status(200)
        .json(responseBody.record<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  const updateUsername = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        body: { username },
      } = toUpdateUsernameDTO(req);

      const userId = (req.user as IAuthPayload).id;
      const output = await service.updateUsername(userId, username);

      res
        .status(200)
        .json(responseBody.record<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  const updateEmail = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        body: { email },
      } = toUpdateEmailDTO(req);

      const userId = (req.user as IAuthPayload).id;
      const output = await service.updateEmail(userId, email);

      res
        .status(200)
        .json(responseBody.record<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  const updateRole = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { id },
        body: { role },
      } = toUpdateRoleDTO(req);

      const output = await service.updateRole(id, role);

      res
        .status(200)
        .json(responseBody.record<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  const updateIsActive = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { id },
        body: { isActive },
      } = toUpdateIsActiveDTO(req);

      const output = await service.updateIsActive(id, isActive);

      res
        .status(200)
        .json(responseBody.record<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  const inactive = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = (req.user as IAuthPayload).id;
      const output = await service.updateIsActive(userId, false);

      res
        .status(200)
        .json(responseBody.record<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  const getById = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { id },
      } = toReadUserDTO(req);

      const output = await service.getById(id);

      res
        .status(200)
        .json(responseBody.record<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  const getAllByQuery = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { query } = toReadUsersDTO(req);

      const userId = (req.user as IAuthPayload).id;

      const { users, ...meta } = await service.getAllByQuery({
        ...query,
        id: userId,
      });

      res.status(200).json(
        responseBody.paginated<typeof users>({
          resources: users,
          ...meta,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  return {
    getAllByQuery,
    getById,
    getProfile,
    inactive,
    updateEmail,
    updateIsActive,
    updateProfile,
    updateRole,
    updateUsername,
  };
};
