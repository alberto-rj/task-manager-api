import { User } from '@/models/user.model';

export type UserResponseDTO = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isActive: boolean;
  timezone: string | undefined;
  avatar: string | undefined;
  bio: string | undefined;
  lastLoginAt: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export function toUserResponseDTO(user: User): UserResponseDTO {
  const { password, ...userWithoutPassword } = user;

  return {
    ...userWithoutPassword,
    avatar: user?.avatar || undefined,
    bio: user.bio || undefined,
    timezone: user.timezone || undefined,
    lastLoginAt: user.lastLoginAt?.toISOString() || undefined,
    updatedAt: user.updatedAt.toISOString(),
    createdAt: user.createdAt.toISOString(),
  };
}
