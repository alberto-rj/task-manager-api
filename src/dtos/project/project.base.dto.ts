import { z } from 'zod';

import {
  defaultFalse,
  imageURL,
  isoFutureDate,
  uuid,
} from '@/dtos/common/common.base.dto';
import { ProjectPriority, ProjectStatus } from '@/models/project.model';
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

export const status = z
  .enum(
    [ProjectStatus.ACTIVE, ProjectStatus.ARCHIVED, ProjectStatus.COMPLETED],
    { message: 'status must be valid.' },
  )
  .default(ProjectStatus.ACTIVE);

export const priority = z
  .enum(
    [
      ProjectPriority.LOW,
      ProjectPriority.MEDIUM,
      ProjectPriority.HIGH,
      ProjectPriority.URGENT,
    ],
    { message: 'priority must be valid.' },
  )
  .default(ProjectPriority.MEDIUM);

export const coverImage = imageURL('coverImage', 'cover-image');

export const startDate = isoFutureDate('startDate');

export const endDate = isoFutureDate('endDate');

export const isPublic = defaultFalse('isPublic');

export const isArchived = defaultFalse('isArchived');

export const authorId = uuid('authorId');

export const orderBy = z
  .enum(
    [
      'name',
      'description',
      'startDate',
      'endDate',
      'createdAt',
      'updatedAt',
      'archivedAt',
    ],
    { message: 'orderBy is invalid.' },
  )
  .default('createdAt');

export const includeArchived = defaultFalse('includeArchived');

export const includePrivate = defaultFalse('includePrivate');
