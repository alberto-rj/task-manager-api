import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email'),
  username: z.string().min(3, 'Name must have at least 3 characters'),
  name: z.string().min(2, 'Name must have at least 2 characters'),
  password: z.string().min(6, 'Password must have at least 6 characters log'),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
