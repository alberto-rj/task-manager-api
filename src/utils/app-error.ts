export interface IAppErrorFormat {
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
    Object.setPrototypeOf(this, AppError.prototype);
  }

  format(): IAppErrorFormat {
    return { message: this.message };
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

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
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
    return { message: this.message, details: this.details };
  }
}
