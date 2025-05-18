import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { z } from 'zod';

import { User } from '../models/user.model';
import {
  email,
  firstName,
  lastName,
  password,
  username,
  UserOutput,
} from './user.dto';

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

export const signupInputSchema = z.object({
  firstName,
  lastName,
  username,
  email,
  password,
});

export type SignupInput = z.infer<typeof signupInputSchema>;

export type SignupOutput = {
  user: UserOutput;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenInput = {
  refreshToken: string;
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
  user?: UserOutput;
}

export const toIUserPayload = ({
  id,
}: User | UserOutput | { id: string }): IUserPayload => {
  return { id };
};

export const toSigninInput = (data: unknown): SigninInput => {
  return signinInputSchema.parse(data);
};

export const toSignupInput = (data: unknown): SignupInput => {
  return signupInputSchema.parse(data);
};
