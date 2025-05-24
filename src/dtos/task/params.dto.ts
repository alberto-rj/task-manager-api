import { z } from 'zod';

// dtos/task/params.dto.ts
export const TaskParamsDTOSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
});

export type TaskParamsDTO = z.infer<typeof TaskParamsDTOSchema>;
