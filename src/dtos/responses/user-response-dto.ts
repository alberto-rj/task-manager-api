import { IUser } from '@/models/user';

export type UserResponseDTO = Omit<IUser, 'password'>;

export function toUserResponseDTO(user: IUser): UserResponseDTO {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
