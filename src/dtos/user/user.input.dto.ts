import { z } from 'zod';

import {
  id,
  firstName,
  lastName,
  username,
  email,
  password,
  avatar,
  bio,
  timezone,
  search,
  orderBy,
  sortOrder,
  limit,
  page,
  includeMe,
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
  body: z.object({
    firstName: firstName.optional(),
    lastName: lastName.optional(),
    bio: bio.optional(),
    timezone: timezone.optional(),
    avatar: avatar.optional(),
  }),
});

export const updateEmail = z.object({
  body: z.object({
    email: email,
  }),
});

export const updateUsername = z.object({
  body: z.object({
    username,
  }),
});

export const updatePassword = z.object({
  body: z.object({
    password,
  }),
});

export const readUser = z.object({
  params: z.object({
    id,
  }),
});

export const readUsers = z.object({
  query: z.object({
    search,
    orderBy,
    sortOrder,
    page,
    limit,
    includeMe,
  }),
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

export type ReadUserDTO = z.infer<typeof readUser>;

export type ReadUsersDTO = z.infer<typeof readUsers>;

export type UserEntriesDTO = CreateUserDTO['body'];

export type CreateUserBodyDTO = CreateUserDTO['body'];

export type UpdateUserBodyDTO = UpdateUserDTO['body'];

export type UserQueryDTO = { id: string } & ReadUsersDTO['query'];

export const toCreateUserDTO = (data: unknown): CreateUserDTO => {
  return validate<CreateUserDTO>(createUser, data);
};

export const toReadUserDTO = (data: unknown): ReadUserDTO => {
  return validate<ReadUserDTO>(readUser, data);
};

export const toReadUsersDTO = (data: unknown): ReadUsersDTO => {
  return validate<ReadUsersDTO>(readUsers, data);
};

export const toUpdateUserDTO = (data: unknown): UpdateUserDTO => {
  return validate<UpdateUserDTO>(updateUser, data);
};

export const toUpdateUsernameDTO = (data: unknown): UpdateUsernameDTO => {
  return validate<UpdateUsernameDTO>(updateUsername, data);
};
export const toUpdateEmailDTO = (data: unknown): UpdateEmailDTO => {
  return validate<UpdateEmailDTO>(updateEmail, data);
};

export const toUpdatePasswordDTO = (data: unknown): UpdatePasswordDTO => {
  return validate<UpdatePasswordDTO>(updatePassword, data);
};
