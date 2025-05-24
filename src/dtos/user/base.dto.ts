import validator from 'validator';
import { z } from 'zod';

import { create } from '@/types/sanitize-string-builder';
import { uuid } from '@/dtos/common/base.dto';

export const id = uuid();

export const firstName = z
  .string({ required_error: 'First name is required.' })
  .min(1, { message: 'First name cannot be empty.' })
  .max(50, { message: 'First name cannot exceed 50 characters.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const lastName = z
  .string({ required_error: 'Last name is required.' })
  .min(1, { message: 'Last name cannot be empty.' })
  .max(50, { message: 'Last name cannot exceed 50 characters.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const username = z
  .string({ required_error: 'Username is required.' })
  .min(3, { message: 'Username must be at least 3 characters.' })
  .max(20, { message: 'Username cannot exceed 20 characters.' })
  .refine((value) => validator.isAlphanumeric(value), {
    message: 'Username must contain only alphanumeric characters (a-z, 0-9).',
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
  .string({ required_error: 'Email is required.' })
  .max(60, { message: 'Email cannot exceed 60 characters.' })
  .email({
    message: 'Email must be a valid address (e.g., "name@example.com").',
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
  .string({ required_error: 'Password is required.' })
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
        'Password must have at least 8 characters, including 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 symbols.',
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
  .string()
  .max(200, { message: 'Bio cannot exceed 200 characters.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  )
  .optional();

export const avatar = z
  .string()
  .refine((value) => validator.isURL(value), {
    message:
      'Avatar must be a valid URL (e.g., "https://example.com/avatar.png").',
  })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  )
  .optional();

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
