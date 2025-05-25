import { UserResponseDTO } from '@/dtos/user/user.output.dto';

export type AuthResponseDTO = {
  user: UserResponseDTO;
  accessToken: string;
  refreshToken: string;
};
