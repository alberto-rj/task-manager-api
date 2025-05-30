import validator from 'validator';
import { z } from 'zod';

import { create } from '@/types/sanitize-string-builder';
import { uuid } from '@/dtos/common/base.dto';

export const id = uuid();

export const firstName = z
  .string({ required_error: 'firstName is required.' })
  .min(1, { message: 'firstName cannot be empty.' })
  .max(50, { message: 'firstName cannot exceed 50 characters.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const lastName = z
  .string({ required_error: 'lastName is required.' })
  .min(1, { message: 'lastName cannot be empty.' })
  .max(50, { message: 'lastName cannot exceed 50 characters.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const username = z
  .string({ required_error: 'username is required.' })
  .min(3, { message: 'username must be at least 3 characters.' })
  .max(20, { message: 'username cannot exceed 20 characters.' })
  .refine((value) => validator.isAlphanumeric(value), {
    message: 'username must contain only alphanumeric characters (a-z, 0-9).',
  })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .escapeHTML()
      .removeControlChars()
      .toLowerCase()
      .build(),
  );

export const email = z
  .string({ required_error: 'email is required.' })
  .max(60, { message: 'email cannot exceed 60 characters.' })
  .email({
    message: 'email must be a valid address (e.g., "name@example.com").',
  })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .toLowerCase()
      .build(),
  );

export const password = z
  .string({ required_error: 'password is required.' })
  .refine(
    (value) =>
      validator.isStrongPassword(value, {
        minUppercase: 2,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
      }),
    {
      message:
        'password must have at least 8 characters, including 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 symbols.',
    },
  )
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const bio = z
  .string({ required_error: 'bio is required.' })
  .max(200, { message: 'bio cannot exceed 200 characters.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const avatar = z
  .string({
    required_error: 'avatar is required.',
  })
  .refine((value) => validator.isURL(value), {
    message:
      'avatar must be a valid URL (e.g., "https://example.com/avatar.png").',
  })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

const isValidTimezone = (timezone: string): boolean => {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    return true;
  } catch (error) {
    return false;
  }
};

export const timezone = z
  .string()
  .default('UTC')
  .refine((value) => isValidTimezone(value), {
    message:
      'Invalid timezone format. Must be a valid IANA timezone (e.g., "America/Sao_Paulo").',
  })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const search = z
  .string()
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const orderBy = z
  .enum(
    [
      'firstName',
      'lastName',
      'username',
      'email',
      'createdAt',
      'updatedAt',
      'timezone',
    ],
    { message: 'orderBy must be valid.' },
  )
  .default('updatedAt');

export const sortOrder = z
  .enum(['asc', 'desc'], { message: 'sortOrder must be "asc" or "desc".' })
  .default('asc');

export const limit = z.coerce
  .number({
    invalid_type_error: 'limit must be a number.',
    required_error: 'limit is required.',
  })
  .int({ message: 'limit must be an integer.' })
  .min(0, { message: 'limit must at least 0.' })
  .max(60, { message: 'limit cannot exceed 60.' })
  .default(20);

export const page = z.coerce
  .number({
    invalid_type_error: 'page must be a number.',
    required_error: 'page is required.',
  })
  .int({ message: 'page must be an integer.' })
  .min(1, { message: 'page must at least 1.' })
  .default(20);
