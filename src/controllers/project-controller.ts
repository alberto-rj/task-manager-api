import { NextFunction, Response } from 'express';

import { IProjectService } from '@/interfaces/services/i-project-service';
import responseBody from '@/utils/response-body';
import {
  toProjectUpdateIsArchived,
  toProjectCreate,
  toProjectDelete,
  toProjectRead,
  toProjectList,
  toProjectUpdate,
} from '@/dtos/project/project.input.dto';
import { IAuthRequest } from '@/types/i-auth-request';
import { IAuthPayload } from '@/types/i-auth-payload';

export const newProjectController = (service: IProjectService) => {
  const readAll = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { query } = toProjectList(req);

      const authorId = (req.user as IAuthPayload).id;
      const { resources, ...meta } = await service.getAll({
        authorId,
        ...query,
      });

      res
        .status(200)
        .json(responseBody.records<typeof resources>({ resources, ...meta }));
    } catch (error) {
      next(error);
    }
  };

  const read = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const {
        params: { id },
      } = toProjectRead(req);

      const authorId = (req.user as IAuthPayload).id;
      const dto = await service.getById({ id, authorId });

      res.status(200).json(responseBody.updated<typeof dto>({ resource: dto }));
    } catch (error) {
      next(error);
    }
  };

  const create = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = toProjectCreate(req);

      const authorId = (req.user as IAuthPayload).id;
      const dto = await service.create({ ...body, authorId });

      res.status(201).json(responseBody.updated<typeof dto>({ resource: dto }));
    } catch (error) {
      next(error);
    }
  };

  const change = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { id },
        body,
      } = toProjectUpdate(req);

      const authorId = (req.user as IAuthPayload).id;
      const output = await service.update({ ...body, id, authorId });

      res
        .status(200)
        .json(responseBody.updated<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  const remove = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { id },
      } = toProjectDelete(req);

      const authorId = (req.user as IAuthPayload).id;
      await service.delete({ id, authorId });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  const changeIsArchived = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { id },
        body: { isArchived },
      } = toProjectUpdateIsArchived(req);

      const authorId = (req.user as IAuthPayload).id;
      const output = await service.updateIsArchived({
        id,
        authorId,
        isArchived,
      });

      res
        .status(200)
        .json(responseBody.updated<typeof output>({ resource: output }));
    } catch (error) {
      next(error);
    }
  };

  return {
    create,
    read,
    readAll,
    remove,
    change,
    changeIsArchived,
  };
};
