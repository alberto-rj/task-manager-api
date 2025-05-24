// dtos/task/body.dto.ts
import { z } from 'zod';

export const CreateTaskBodyDTOSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  dueDate: z.string().datetime().optional(),
  assigneeId: z.string().uuid().optional(),
});

export const UpdateTaskBodyDTOSchema = CreateTaskBodyDTOSchema.partial();

export type CreateTaskBodyDTO = z.infer<typeof CreateTaskBodyDTOSchema>;
export type UpdateTaskBodyDTO = z.infer<typeof UpdateTaskBodyDTOSchema>;
