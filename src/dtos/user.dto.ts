import { z } from 'zod';

import {
  User,
  firstName,
  lastName,
  username,
  email,
  password,
} from '../models/user.model';

export const createUserInputSchema = z.object({
  firstName,
  lastName,
  username,
  email,
  password,
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  username: username.optional(),
  email: email.optional(),
  password: password.optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export type UserOutput = Omit<User, 'password' | 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export function toUserOutput(user: User): UserOutput {
  const { password, ...userWithoutPassword } = user;
  const userOut = {
    ...userWithoutPassword,
    updatedAt: userWithoutPassword.updatedAt.toISOString(),
    createdAt: userWithoutPassword.createdAt.toISOString(),
  };

  return userOut;
}
