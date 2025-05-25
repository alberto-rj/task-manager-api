import validator from 'validator';
import { z } from 'zod';
import { uuid } from '../common/base.dto';

export const id = uuid('Project ID');

export const name = z
  .string({ required_error: 'Name is required.' })
  .min(3, { message: 'Must have at least 3 characters long.' })
  .max(30, { message: 'Must have until 30 characters.' });

export const description = z
  .string()
  .min(3, { message: 'Must have at least 3 characters' })
  .max(60, { message: 'Must have until 60 characters' });

export const coverImage = z
  .string()
  .refine((value) => validator.isURL(value), { message: 'Invalid URL' })
  .optional();

export const startDate = z
  .string()
  .refine((value) => validator.isISO8601(value), {
    message: 'Start date must be ISO Date',
  })
  .refine((value) => validator.isAfter(value), {
    message: 'Start date must be in the future.',
  });

export const endDate = z
  .string({ required_error: 'End date is required.' })
  .refine((value) => validator.isISO8601(value), {
    message: 'End date must be ISO Date',
  })
  .refine((value) => validator.isAfter(value), {
    message: 'End date must be in the future.',
  });

export const isPublic = z
  .string({ required_error: 'Public is required.' })
  .refine((value) => value === 'true' || value === 'false', {
    message: 'Public can only be either true or false.',
  })
  .transform((value) => value == 'true');

export const isArchived = z
  .string({ required_error: 'is archived is required.' })
  .refine((value) => value === 'true' || value === 'false', {
    message: 'Must be either true or false',
  })
  .transform((value) => value === 'true');

export const authorId = id;

export const createdAt = z.date();

export const updatedAt = z.date();

export const includeArchived = z
  .string()
  .refine((value) => value === 'true' || value === 'false', {
    message: 'Include archived must be either "true" or "false"',
  })
  .transform((arg) => arg === 'true')
  .optional();
