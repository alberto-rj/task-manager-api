import validator from 'validator';
import { z } from 'zod';

import { uuid } from '@/dtos/common/base.dto';
import { create } from '@/types/sanitize-string-builder';

export const id = uuid('id');

export const name = z
  .string({ required_error: 'name is required.' })
  .min(1, { message: 'name cannot be empty.' })
  .max(100, { message: 'name cannot exceed 100 characters.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const description = z
  .string({ required_error: 'description is required.' })
  .max(500, { message: 'description must have until 500 characters.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const coverImage = z
  .string({ required_error: 'coverImage is required.' })
  .refine((value) => validator.isURL(value), {
    message:
      'coverImage must be a valid URL (e.g., "https://example.com/cover-image.png").',
  })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const startDate = z
  .string({ required_error: 'startDate is required.' })
  .refine((value) => validator.isISO8601(value, { strict: true }), {
    message:
      'endDate must be a valid ISO 8601 date (e.g., "2025-05-25T00:00:00Z").',
  })
  .refine((value) => validator.isAfter(value), {
    message: 'startDate must be in the future.',
  })
  .transform((value) => new Date(value));

export const endDate = z
  .string({ required_error: 'endDate is required.' })
  .refine((value) => validator.isISO8601(value, { strict: true }), {
    message:
      'endDate must be a valid ISO 8601 date (e.g., "2025-05-25T00:00:00Z").',
  })
  .refine((value) => validator.isAfter(value), {
    message: 'endDate must be in the future.',
  })
  .transform((value) => new Date(value));

export const duration = z
  .object({
    startDate,
    endDate,
  })
  .refine(({ startDate, endDate }) => endDate >= startDate, {
    message: 'endDate must be greater than or equal to startDate.',
    path: ['endDate'],
  });

export const isPublic = z
  .string()
  .default('false')
  .refine((value) => value === 'true' || value === 'false', {
    message: 'isPublic must be "true" or "false".',
  })
  .transform((value) => value === 'true');

export const isArchived = z
  .string()
  .default('false')
  .refine((value) => value === 'true' || value === 'false', {
    message: 'isArchived must be "true" or "false".',
  })
  .transform((value) => value === 'true');

export const authorId = uuid('authorId');

export const includeArchived = z
  .string({ required_error: 'includeArchived is required.' })
  .default('false')
  .refine((value) => value === 'true' || value === 'false', {
    message: 'includeArchived must be "true" or "false".',
  })
  .transform((arg) => arg === 'true');
