import { NextFunction, Response } from 'express';

import { IProjectService } from '@/interfaces/services/i-project-service';
import responseBody from '@/utils/response-body';
import {
  toArchiveProjectDTO,
  toCreateProjectDTO,
  toDeleteProjectDTO,
  toGetProjectDTO,
  toListProjectDTO,
  toUpdateProjectDTO,
} from '@/dtos/project/project.input';
import { IAuthRequest } from '@/types/i-auth-request';
import { IAuthPayload } from '@/types/i-auth-payload';

export const newProjectController = (service: IProjectService) => {
  const getProjects = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        query: { includeArchived },
      } = toListProjectDTO(req);
      const authorId = (req.user as IAuthPayload).id;
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
      } = toGetProjectDTO(req);

      const authorId = (req.user as IAuthPayload).id;
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
      const { body } = toCreateProjectDTO(req);
      const authorId = (req.user as IAuthPayload).id;
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
      } = toUpdateProjectDTO(req);

      const authorId = (req.user as IAuthPayload).id;
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
      } = toDeleteProjectDTO(req);

      const authorId = (req.user as IAuthPayload).id;
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
      } = toArchiveProjectDTO(req);

      const authorId = (req.user as IAuthPayload).id;
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
