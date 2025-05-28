import { z } from 'zod';

import { create } from '@/types/sanitize-string-builder';

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

export const page = z.coerce
  .number({
    message:
      'page must be an integer number greater or equal to 1 (its default value is 1).',
  })
  .int()
  .default(1);

export const limit = z.coerce
  .number({
    message:
      'limit must be an integer number between 1 and 100 (its default value is 20).',
  })
  .int()
  .min(1)
  .max(100)
  .default(20);

export const sortBy = z.string().optional();

export const sortOrder = z
  .enum(['asc', 'desc'], { message: 'sortOrder must be "asc" or "desc"' })
  .default('asc');

export const createdAt = z.date();

export const updatedAt = z.date();

export const uuidParamDTOSchema = z.object({
  id: uuid('id'),
});

export const paginationQuerySchema = z.object({
  page,
  limit,
  sortBy,
  sortOrder,
});
