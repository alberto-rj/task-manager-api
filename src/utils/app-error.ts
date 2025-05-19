import responseBody from './response-body';

export abstract class AppError<T = undefined> extends Error {
  public readonly code: number;
  protected details?: T;

  constructor(message: string, code: number, details?: T) {
    super(message);
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  format() {
    return responseBody.error<T>({
      code: this.code,
      name: this.name,
      message: this.message,
      details: this.details,
    });
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}

export type ValidationErrorDetails = {
  path: string;
  message: string;
};

export class ValidationError extends AppError<ValidationErrorDetails[]> {
  constructor(
    details: ValidationErrorDetails[],
    message: string = 'Validation error',
  ) {
    super(message, 422, details);
  }
}

export type ConflictErrorDetails = {
  field: string;
  message: string;
};

export class ConflictError extends AppError<ConflictErrorDetails[]> {
  constructor(
    details: ConflictErrorDetails[],
    message: string = 'Conflict error',
  ) {
    super(message, 409, details);
  }
}
