export type PaginatedInput<T> = {
  resources: T[];
  total: number;
  page: number;
  limit: number;
};

export type PaginatedOutput<T> = {
  success: boolean;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
    data: T[];
  };
};

export function paginated<T>({
  resources,
  total,
  page,
  limit,
}: PaginatedInput<T>): PaginatedOutput<T> {
  return {
    success: true,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      data: resources,
    },
  };
}

export type RecordInput<T> = {
  resource: T;
};

export type RecordOutput<T> = {
  success: boolean;
  data: T;
};

export function record<T>({ resource }: RecordInput<T>): RecordOutput<T> {
  return {
    success: true,
    data: resource,
  };
}

export type RecordsInput<T> = {
  resources: T[];
};

export type RecordsOutput<T> = {
  success: boolean;
  data: T[];
};

export function records<T>({ resources }: RecordsInput<T>): RecordsOutput<T> {
  return {
    success: true,
    data: resources,
  };
}

export type AuthInput<T> = {
  accessToken: string;
  user: T;
};

export type AuthOutput<T> = {
  success: boolean;
  accessToken: string;
  user: T;
};

export function auth<T>({ accessToken, user }: AuthInput<T>): AuthOutput<T> {
  return {
    success: true,
    accessToken,

    user,
  };
}

export type ErrorInput = {
  message: string;
};

export type ErrorOutput = {
  success: boolean;
  message: string;
};

export function error({
  message = 'Operation failed',
}: ErrorInput): ErrorOutput {
  return {
    success: false,
    message,
  };
}

export type ErrorsInput<T> = {
  errors: T[];
};

export type ErrorsOutput<T> = {
  success: boolean;
  errors: T[];
};

export function errors<T>({ errors }: ErrorsInput<T>): ErrorsOutput<T> {
  return {
    success: false,
    errors,
  };
}

export type CreatedInput<T> = {
  resource: T;
  message: string;
};

export type CreatedOutput<T> = {
  success: boolean;
  message: string;
  data: T;
};

export function created<T>({
  resource,
  message = 'Resource created successfully',
}: CreatedInput<T>): CreatedOutput<T> {
  return {
    success: true,
    message,
    data: resource,
  };
}

export type UpdatedInput<T> = {
  resource: T;
};

export type UpdatedOutput<T> = {
  success: boolean;
  data: T;
};

export function updated<T>({ resource }: UpdatedInput<T>): UpdatedOutput<T> {
  return {
    success: true,
    data: resource,
  };
}

export type DeletedInput = {
  message: string;
};

export type DeletedOutput = {
  success: boolean;
  message: string;
};

export function deleted({
  message = 'Resource deleted successfully',
}: DeletedInput): DeletedOutput {
  return {
    success: true,
    message,
  };
}
