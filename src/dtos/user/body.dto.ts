import { z } from 'zod';

import {
  avatar,
  bio,
  email,
  firstName,
  lastName,
  password,
  timezone,
  username,
} from '@/dtos/user/base.dto';

export const createUserBodyDTOSchema = z.object({
  firstName,
  lastName,
  username,
  email,
  password,
});

export type CreateUserBodyDTO = z.infer<typeof createUserBodyDTOSchema>;

export const updateUserBodyDTOSchema = z.object({
  firstName,
  lastName,
  bio,
  timezone,
  avatar,
});

export type UpdateUserBodyDTO = z.infer<typeof updateUserBodyDTOSchema>;
