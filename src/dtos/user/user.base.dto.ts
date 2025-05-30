import validator from 'validator';
import { z } from 'zod';

import { create } from '@/types/sanitize-string-builder';
import { uuid } from '@/dtos/common/common.base.dto';

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
  .string({
    invalid_type_error: 'lastName must be string',
    required_error: 'lastName is required.',
  })
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
  .string({
    invalid_type_error: 'username must be a string.',
    required_error: 'username is required.',
  })
  .min(3, { message: 'username must be at least 3 characters.' })
  .max(20, { message: 'username cannot exceed 20 characters.' })
  .refine(
    (value) => validator.isAlphanumeric(value, 'en-US', { ignore: '_' }),
    {
      message:
        'username only must includes uppercase letters, lowercase letters, numbers and underscore.',
    },
  )
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .escapeHTML()
      .removeControlChars()
      .build(),
  );

export const email = z
  .string({
    invalid_type_error: 'email must be a string.',
    required_error: 'email is required.',
  })
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
  .string({
    invalid_type_error: 'password must be a string.',
    required_error: 'password is required.',
  })
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
  .string({
    invalid_type_error: 'bio must be a string.',
    required_error: 'bio is required.',
  })
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
    invalid_type_error: 'avatar must be a string.',
    required_error: 'avatar is required.',
  })
  .refine((value) => validator.isURL(value), {
    message:
      'avatar must be a valid URL (e.g., "https://example.com/avatar.png").',
  })
  .transform((value) =>
    create(value).normalizeWhitespace().removeControlChars().build(),
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
  .string({ invalid_type_error: 'timezone must be a string.' })
  .default('UTC')
  .refine((value) => isValidTimezone(value), {
    message:
      'timezone must be in IANA timezone format (e.g., "America/Sao_Paulo").',
  })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const search = z
  .string({ invalid_type_error: 'search must be a string.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  )
  .default('');

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
    {
      invalid_type_error: 'orderBy must be a string.',
      message: 'orderBy must be valid.',
    },
  )
  .default('createdAt');

export const includeMe = z
  .string()
  .default('false')
  .refine((value) => value === 'true' || value === 'false', {
    message: 'includeMe must be "true" or "false".',
  })
  .transform((value) => value === 'true');
