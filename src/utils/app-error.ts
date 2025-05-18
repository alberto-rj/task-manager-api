export interface IAppErrorFormat {
  success: boolean;
  message: string;
}

export abstract class AppError<
  T extends IAppErrorFormat = IAppErrorFormat,
> extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  format(): IAppErrorFormat {
    return { success: false, message: this.message };
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

export interface IValidationErrorFormat extends IAppErrorFormat {
  details: ValidationErrorDetails[];
}

export class ValidationError extends AppError<IValidationErrorFormat> {
  private details: ValidationErrorDetails[];

  constructor(
    details: ValidationErrorDetails[],
    message: string = 'Validation error',
  ) {
    super(message, 422);
    this.details = details;
  }

  format(): IValidationErrorFormat {
    return { ...super.format(), details: this.details };
  }
}

export type ConflictErrorDetails = {
  field: string;
  message: string;
};

export interface IConflictErrorFormat extends IAppErrorFormat {
  details: ConflictErrorDetails[];
}

export class ConflictError extends AppError<IConflictErrorFormat> {
  private details: ConflictErrorDetails[];

  constructor(
    details: ConflictErrorDetails[],
    message: string = 'Conflict error',
  ) {
    super(message, 409);
    this.details = details;
  }

  format(): IConflictErrorFormat {
    return { ...super.format(), details: this.details };
  }
}
