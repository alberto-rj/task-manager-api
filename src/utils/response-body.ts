export function record<T>(payload: { resource: T }): {
  success: boolean;
  data: { results: T[] };
} {
  return {
    success: true,
    data: { results: [payload.resource] },
  };
}

export function records<T>(payload: { resources: T }): {
  success: boolean;
  data: { results: T };
} {
  return {
    success: true,
    data: { results: payload.resources },
  };
}

export function paginated<T>(payload: {
  resources: T[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}): {
  success: boolean;
  data: {
    results: T[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
} {
  return {
    success: true,
    data: { ...payload, results: payload.resources },
  };
}

export function auth<T>(payload: { accessToken: string; user: T }): {
  success: boolean;
  data: { accessToken: string; user: T };
} {
  return {
    success: true,
    data: { ...payload },
  };
}

export function error<T>(payload: {
  code: number;
  name: string;
  message: string;
  details?: T;
}): {
  success: boolean;
  data: { error: { code: number; name: string; message: string; details?: T } };
} {
  return {
    success: false,
    data: { error: { ...payload } },
  };
}

export function success(payload: { message: string }): {
  success: boolean;
  data: { message: string };
} {
  return {
    success: true,
    data: payload,
  };
}

export function updated<T>(payload: { resource: T }): {
  success: boolean;
  data: { results: T[] };
} {
  return {
    success: true,
    data: { results: [payload.resource] },
  };
}

export default {
  auth,
  error,
  success,
  paginated,
  record,
  records,
  updated,
};
