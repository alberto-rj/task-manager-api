import { NextFunction, Response } from 'express';

import { IAuthRequest, IUserPayload } from '../dtos/auth.dto';
import { IProjectService } from '../services/i-project-service';
import responseBody from '../utils/response-body';
import {
  toArchiveProjectRIO,
  toCreateProjectRIO,
  toDeleteProjectRIO,
  toGetProjectRIO,
  toGetProjectsRIO,
  toUpdateProjectRIO,
} from '../validators/project-validator';

export const newProjectController = (service: IProjectService) => {
  const getProjects = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        query: { includeArchived },
      } = toGetProjectsRIO(req);
      const authorId = (req.user as IUserPayload).id;
      const dto = await service.getAll(authorId, { includeArchived });

      res
        .status(200)
        .json(responseBody.records<typeof dto>({ resources: dto }));
    } catch (error) {
      next(error);
    }
  };

  const getProject = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { projectId },
      } = toGetProjectRIO(req);

      const authorId = (req.user as IUserPayload).id;
      const dto = await service.getById(projectId, authorId);

      res.status(200).json(responseBody.updated<typeof dto>({ resource: dto }));
    } catch (error) {
      next(error);
    }
  };

  const createProject = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = toCreateProjectRIO(req);
      const authorId = (req.user as IUserPayload).id;
      const dto = await service.create(authorId, body);

      res.status(201).json(responseBody.updated<typeof dto>({ resource: dto }));
    } catch (error) {
      next(error);
    }
  };

  const updateProject = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { projectId },
        body,
      } = toUpdateProjectRIO(req);

      const authorId = (req.user as IUserPayload).id;
      const dto = await service.update(projectId, authorId, body);

      res.status(200).json(responseBody.updated<typeof dto>({ resource: dto }));
    } catch (error) {
      next(error);
    }
  };

  const deleteProject = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { projectId },
      } = toDeleteProjectRIO(req);

      const authorId = (req.user as IUserPayload).id;
      await service.delete(projectId, authorId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  const archiveProject = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        params: { projectId },
        body,
      } = toArchiveProjectRIO(req);

      const authorId = (req.user as IUserPayload).id;
      const dto = await service.archive(projectId, authorId, body);

      res.status(200).json(responseBody.updated<typeof dto>({ resource: dto }));
    } catch (error) {
      next(error);
    }
  };

  return {
    archiveProject,
    createProject,
    deleteProject,
    getProject,
    getProjects,
    updateProject,
  };
};
