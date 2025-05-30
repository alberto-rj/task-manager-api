export const toPaginationOutput = <T>({
  total,
  page,
  limit,
  resources,
}: {
  page: number;
  limit: number;
  total: number;
  resources: T;
}): {
  total: number;
  limit: number;
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  resources: T;
} => {
  return {
    total,
    limit,
    page,
    pages: Math.ceil(total / limit),
    hasPrev: page > 1,
    hasNext: total > limit * (page - 1),
    resources,
  };
};
