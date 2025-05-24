import { z } from 'zod';

import { UpdateTaskBodyDTOSchema } from '@/dtos/task/body.dto';
import { TaskParamsDTOSchema } from '@/dtos/task/params.dto';
import { TaskQueryDTOSchema } from '@/dtos/task/query.dto';

export const GetTaskEndpointDTOSchema = z.object({
  params: TaskParamsDTOSchema,
  query: TaskQueryDTOSchema.pick({ include: true }),
});

export const UpdateTaskEndpointDTOSchema = z.object({
  params: TaskParamsDTOSchema,
  body: UpdateTaskBodyDTOSchema,
});

export const ListTasksEndpointDTOSchema = z.object({
  params: z.object({ projectId: z.string().uuid() }),
  query: TaskQueryDTOSchema,
});

export type GetTaskEndpointDTO = z.infer<typeof GetTaskEndpointDTOSchema>;
export type UpdateTaskEndpointDTO = z.infer<typeof UpdateTaskEndpointDTOSchema>;
export type ListTasksEndpointDTO = z.infer<typeof ListTasksEndpointDTOSchema>;
