import { z } from 'zod';

import { User } from '@/models/user.model';

export const id = z.string().uuid('ID Must be in UUID format');

export const firstName = z
  .string()
  .min(3, 'First name must have at least 3 characters')
  .max(30, 'First name must have until 30 characters');

export const lastName = z
  .string()
  .min(3, 'Last name must have at least 3 characters')
  .max(30, 'Last name must have until 30 characters');

export const username = z
  .string()
  .min(3, 'Username must have at least 3 characters')
  .max(20, 'Username must have until 20 characters');

export const email = z
  .string()
  .max(60, 'Email must have until 60 characters')
  .email('Email must be a valid email');

export const password = z
  .string()
  .min(6, 'Password must have at least 6 characters')
  .max(20, 'Password must have until 20 characters');

export const createdAt = z.date();

export const updatedAt = z.date();

export const userSchema = z.object({
  id,
  firstName,
  lastName,
  username,
  email,
  password,
  createdAt,
  updatedAt,
});

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
