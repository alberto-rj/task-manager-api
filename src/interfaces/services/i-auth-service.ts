import { AuthResponseDTO } from '@/dtos/auth/auth.output.dto';
import { LoginBodyDTO } from '@/dtos/auth/auth.input.dto';
import { CreateUserBodyDTO } from '@/dtos/user/user.input.dto';

export interface IAuthService {
  login(data: LoginBodyDTO): Promise<AuthResponseDTO>;

  register(data: CreateUserBodyDTO): Promise<AuthResponseDTO>;

  refreshToken(token: string): Promise<AuthResponseDTO>;

  logout(refreshToken: string): Promise<void>;
}
