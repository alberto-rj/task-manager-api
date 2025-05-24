import { z } from 'zod';

export const uuid = z.string().uuid({ message: 'Must be a valid UUID' });

export const page = z.coerce.number().int().min(1).default(1);

export const limit = z.coerce.number().int().min(1).max(100).default(20);

export const sortBy = z.string().optional();

export const sortOrder = z.enum(['asc', 'desc']).default('asc');

export const createdAt = z.date();

export const updatedAt = z.date();

export const uuidParamDTOSchema = z.object({
  id: uuid,
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
