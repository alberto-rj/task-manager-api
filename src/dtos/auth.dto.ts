import { z } from 'zod';

import {
  email,
  firstName,
  lastName,
  password,
  username,
} from '../models/user.model';

export const signinInputSchema = z.object({
  identifier: z.string().trim().min(2, 'Identifier cant not be empty'),
  password,
});

export type SigninInput = z.infer<typeof signinInputSchema>;

export type SigninOutput = {};

export const signupInputSchema = z.object({
  firstName,
  lastName,
  username,
  email,
  password,
});

export type SignupInput = z.infer<typeof signupInputSchema>;

export type SignupOutput = {};
