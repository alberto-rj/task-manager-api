import { z } from 'zod';

import { create } from '@/types/sanitize-string-builder';

export const uuid = (fieldName: string = 'ID') =>
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

export const page = z.coerce.number().int().min(1).default(1);

export const limit = z.coerce.number().int().min(1).max(100).default(20);

export const sortBy = z.string().optional();

export const sortOrder = z.enum(['asc', 'desc']).default('asc');

export const createdAt = z.date();

export const updatedAt = z.date();

export const uuidParamDTOSchema = z.object({
  id: uuid('id'),
});

export const paginationQueryDTOSchema = z.object({
  page,
  limit,
  sortBy,
  sortOrder,
});

export const timestampDTOSchema = z.object({
  createdAt,
  updatedAt,
});
