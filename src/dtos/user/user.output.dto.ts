import { User } from '@/models/user.model';
import { UserResult } from '@/types/user';
import { UserQueryDTO } from '@/dtos/user/user.input.dto';

export type UserResponseDTO = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  timezone: string | undefined;
  avatar: string | undefined;
  bio: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export type UserQueryResponseDTO = {
  users: UserResponseDTO[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export function toUserResponseDTO(user: User): UserResponseDTO {
  const { password, ...userWithoutPassword } = user;

  return {
    ...userWithoutPassword,
    avatar: user?.avatar || undefined,
    bio: user.bio || undefined,
    timezone: user.timezone || undefined,
    updatedAt: user.updatedAt.toISOString(),
    createdAt: user.createdAt.toISOString(),
  };
}

export function toUserQueryResponseDTO(
  { users, total }: UserResult,
  { limit, page }: UserQueryDTO,
): UserQueryResponseDTO {
  const newUsers = users.map(toUserResponseDTO);

  return {
    users: newUsers,
    total,
    limit,
    page,
    pages: Math.ceil(total / limit),
    hasPrev: page > 1,
    hasNext: total > limit * (page - 1),
  };
}
