import { z } from 'zod';

import {
  id,
  firstName,
  lastName,
  username,
  email,
  password,
  isActive,
  avatar,
  bio,
  timezone,
} from '@/dtos/user/user.base.dto';
import { validate } from '@/utils/validate';

export const createUser = z.object({
  body: z.object({
    firstName,
    lastName,
    username,
    email,
    password,
  }),
});

export const updateUser = z.object({
  params: z.object({ id }),
  body: z.object({
    firstName,
    lastName,
    bio,
    timezone,
    avatar,
  }),
});

export const updateEmail = z.object({
  params: z.object({ id }),
  body: z.object({
    email,
  }),
});

export const updateUsername = z.object({
  params: z.object({ id }),
  body: z.object({
    username,
  }),
});

export const updatePassword = z.object({
  params: z.object({ id }),
  body: z.object({
    password,
  }),
});

export const activeUser = z.object({
  params: z.object({ id }),
  body: z.object({ isActive }),
});

export type UserChangesDTO = Partial<{
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  timezone: string;
  isActive: boolean;
  lastLoginAt: Date;
}>;

export type UserIdentifiersDTO = {
  username: string;
  email: string;
};

export type CreateUserDTO = z.infer<typeof createUser>;

export type UpdateUserDTO = z.infer<typeof updateUser>;

export type UpdateUsernameDTO = z.infer<typeof updateUsername>;

export type UpdateEmailDTO = z.infer<typeof updateEmail>;

export type UpdatePasswordDTO = z.infer<typeof updatePassword>;

export type ActiveUserDTO = z.infer<typeof activeUser>;

export type UserEntriesDTO = CreateUserDTO['body'];

export type CreateUserBodyDTO = CreateUserDTO['body'];

export type UpdateUserBodyDTO = UpdateUserDTO['body'];

export const toCreateUserDTO = (data: unknown): CreateUserDTO => {
  return validate<CreateUserDTO>(createUser, data);
};

export const toUpdateUserDTO = (data: unknown): UpdateUserDTO => {
  return validate<UpdateUserDTO>(updateUser, data);
};

export const toUpdateUsernameDTO = (data: unknown): UpdateUserDTO => {
  return validate<UpdateUserDTO>(updateUser, data);
};

export const toUpdatePasswordDTO = (data: unknown): UpdatePasswordDTO => {
  return validate<UpdatePasswordDTO>(updatePassword, data);
};

export const toActiveUserDTO = (data: unknown): ActiveUserDTO => {
  return validate<ActiveUserDTO>(activeUser, data);
};
