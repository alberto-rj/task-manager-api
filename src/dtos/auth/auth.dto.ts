import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { z } from 'zod';

import { User } from '@/models/user-model';
import {
  email,
  firstName,
  lastName,
  password,
  username,
  UserOutput,
} from '@/dtos/user/user.dto';
import { validate } from '@/utils/validate';

export const signinInputSchema = z.object({
  identifier: z.string().min(1, 'Identifier can not be empty'),
  password,
});

export type SigninInput = z.infer<typeof signinInputSchema>;

export type SigninOutput = {
  user: UserOutput;
  accessToken: string;
  refreshToken: string;
};

export const toSigninInput = (data: unknown): SigninInput => {
  return <SigninInput>validate(signinInputSchema, data);
};

export const signupInputSchema = z.object({
  firstName,
  lastName,
  username,
  email,
  password,
});

export type SignupInput = z.infer<typeof signupInputSchema>;

export const toSignupInput = (data: unknown): SignupInput => {
  return <SignupInput>validate(signupInputSchema, data);
};

export type SignupOutput = {
  user: UserOutput;
  accessToken: string;
  refreshToken: string;
};

export const refreshTokenInputSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token can not be empty'),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenInputSchema>;

export const toRefreshTokenInput = (data: unknown): RefreshTokenInput => {
  return <RefreshTokenInput>validate(refreshTokenInputSchema, data);
};

export type RefreshTokenOutput = {
  accessToken: string;
  refreshToken: string;
  user: UserOutput;
};

export interface IUserPayload extends JwtPayload {
  id: string;
}

export interface IAuthRequest extends Request {
  user?: IUserPayload;
}

export const toIUserPayload = ({
  id,
}: User | UserOutput | { id: string }): IUserPayload => {
  return { id };
};
