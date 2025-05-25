import { z } from 'zod';

import { email, username } from '@/dtos/user/user.base.dto';
import { create } from '@/types/sanitize-string-builder';

const isValidEmail = (input: string) => {
  try {
    email.parse(input);
    return true;
  } catch (error) {
    return false;
  }
};

const isValidUsername = (input: string) => {
  try {
    username.parse(input);
    return true;
  } catch (error) {
    return false;
  }
};

const isValidIdentifier = (input: string) => {
  return isValidEmail(input) || isValidUsername(input);
};

export const identifier = z
  .string({ required_error: 'Identifier is required.' })
  .min(1, { message: 'Identifier cannot be empty.' })
  .refine((value) => isValidIdentifier(value), {
    message: 'Identifier must be either a valid email or email.',
  })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const refreshToken = z
  .string({ required_error: 'Refresh token is required.' })
  .min(1, { message: 'Refresh token cannot be empty.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );
