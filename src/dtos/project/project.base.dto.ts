import { z } from 'zod';

import {
  defaultFalse,
  imageURL,
  isoFutureDate,
  uuid,
} from '@/dtos/common/common.base.dto';
import { create } from '@/types/sanitize-string-builder';

export const id = uuid('id');

export const name = z
  .string({
    invalid_type_error: 'name must be string.',
    required_error: 'name is required.',
  })
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
  .string({
    invalid_type_error: 'description must be string.',
    required_error: 'description is required.',
  })
  .max(500, { message: 'description must have until 500 characters.' })
  .transform((value) =>
    create(value)
      .normalizeWhitespace()
      .removeControlChars()
      .escapeHTML()
      .build(),
  );

export const coverImage = imageURL('coverImage', 'cover-image');

export const startDate = isoFutureDate('startDate');

export const endDate = isoFutureDate('endDate');

export const isPublic = defaultFalse('isPublic');

export const isArchived = defaultFalse('isArchived');

export const authorId = uuid('authorId');

export const includeArchived = defaultFalse('includeArchived');
