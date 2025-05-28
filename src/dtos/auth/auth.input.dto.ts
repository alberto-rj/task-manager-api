import { z } from 'zod';

import { identifier, refreshToken } from '@/dtos/auth/auth.base.dto';
import { password } from '@/dtos/user/user.base.dto';
import { validate } from '@/utils/validate';

export const loginSchema = z.object({
  body: z.object({
    identifier,
    password,
  }),
});

export const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken,
  }),
});

export type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;

export type LoginDTO = z.infer<typeof loginSchema>;

export type LoginBodyDTO = LoginDTO['body'];

export const toLoginDTO = (data: unknown): LoginDTO => {
  return validate<LoginDTO>(loginSchema, data);
};

export const toRefreshTokenDTO = (data: unknown): RefreshTokenDTO => {
  return validate<RefreshTokenDTO>(refreshTokenSchema, data);
};
