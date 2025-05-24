// dtos/task/query.dto.ts
import { z } from 'zod';

export const TaskQueryDTOSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'REVIEW', 'COMPLETED']).optional(),
  assigneeId: z.string().uuid().optional(),
  include: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type TaskQueryDTO = z.infer<typeof TaskQueryDTOSchema>;
