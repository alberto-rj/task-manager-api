import { z } from 'zod';
import { createUserSchema } from './create-user-dto';

export type UpdateUserDTO = z.infer<typeof createUserSchema>;
