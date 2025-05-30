import validator from 'validator';
import { z } from 'zod';

import { create } from '@/types/sanitize-string-builder';
import { firstName } from '../user/user.base.dto';

export const sortOrder = z
  .enum(['asc', 'desc'], {
    invalid_type_error: 'sortOrder must be a string',
    message: 'sortOrder must be "asc" or "desc".',
  })
  .default('desc');

export const limit = z.coerce
  .number({
    invalid_type_error: 'limit must be a number.',
  })
  .int({ message: 'limit must be an integer.' })
  .min(1, { message: 'limit must at least 1.' })
  .max(60, { message: 'limit cannot exceed 60.' })
  .default(20);

export const page = z.coerce
  .number({
    invalid_type_error: 'page must be a number.',
  })
  .int({ message: 'page must be an integer.' })
  .min(1, { message: 'page must be at least 1.' })
  .default(1);

export const uuid = (fieldName: string = 'id') =>
  z
    .string({ required_error: `${fieldName} is required.` })
    .uuid({
      message: `${fieldName} must be a valid UUID v4 (e.g., "123e4567-e89b-12d3-a456-426614174000").`,
    })
    .transform((value) =>
      create(value)
        .normalizeWhitespace()
        .removeControlChars()
        .escapeHTML()
        .build(),
    );

export const imageURL = (
  fieldName: string = 'image',
  fileName: string = 'image',
) =>
  z
    .string({ required_error: 'coverImage is required.' })
    .refine((value) => validator.isURL(value), {
      message: `${firstName} must be a valid URL (e.g., "https://example.com/${fileName}.png").`,
    })
    .transform((value) =>
      create(value)
        .normalizeWhitespace()
        .removeControlChars()
        .escapeHTML()
        .build(),
    );

export const isoDate = (fieldName: string) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be string`,
      required_error: `${fieldName} is required.`,
    })
    .refine((value) => validator.isISO8601(value, { strict: true }), {
      message: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .transform((value) => new Date(value));

export const isoFutureDate = (fieldName: string) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be string`,
      required_error: `${fieldName} is required.`,
    })
    .refine((value) => validator.isISO8601(value, { strict: true }), {
      message: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .refine((value) => validator.isAfter(value), {
      message: `${fieldName} must be only in the future.`,
    })
    .transform((value) => new Date(value));

export const isoPastDate = (fieldName: string) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be string`,
      required_error: `${fieldName} is required.`,
    })
    .refine((value) => validator.isISO8601(value, { strict: true }), {
      message: `${fieldName} must be only in ISO 8601 (e.g., "2025-05-25T00:00:00Z").`,
    })
    .refine((value) => validator.isBefore(value), {
      message: `${fieldName} must be only in the past.`,
    })
    .transform((value) => new Date(value));

export const defaultFalse = (fieldName: string) =>
  z
    .string()
    .default('false')
    .refine((value) => value === 'true' || value === 'false', {
      message: `${fieldName} must be only "true" or "false".`,
    })
    .transform((value) => value === 'true');

export const defaultTrue = (fieldName: string) =>
  z
    .string()
    .default('true')
    .refine((value) => value === 'true' || value === 'false', {
      message: `${fieldName} must be "true" or "false".`,
    })
    .transform((value) => value === 'true');
