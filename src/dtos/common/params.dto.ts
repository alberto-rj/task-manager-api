import { z } from 'zod';

import { uuid } from '@/dtos/common/base.dto';

export const projectParamsDTOSchema = z.object({
  projectId: uuid,
});

export const userParamsDTOSchema = z.object({
  userId: uuid,
});

export const taskParamsDTOSchema = z.object({
  taskId: uuid,
});
