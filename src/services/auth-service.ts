import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { IUserRepository } from '@/repositories/interfaces/i-user-repository';
import { AppError } from '@/utils/app-error';
import { LoginDTO } from '@/dtos/requests/login-dto';
import { AuthResponseDTO } from '@/dtos/responses/auth-response-dto';
import { toUserResponseDTO } from '@/dtos/responses/user-response-dto';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async login({ email, password }: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password do not match', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password do not match', 401);
    }

    // Gera o token JWT
    const token = sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'default-secret',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return {
      user: toUserResponseDTO(user),
      token,
    };
  }
}
