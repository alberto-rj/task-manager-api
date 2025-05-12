import { hash } from 'bcrypt';

import { CreateUserDTO } from '@/dtos/requests/create-user-dto';

import {
  toUserResponseDTO,
  UserResponseDTO,
} from '@/dtos/responses/user-response-dto';

import { IUserService } from '@/services/interfaces/i-user-services';

import { IUserRepository } from '@/repositories/interfaces/i-user-repository';

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
    return users.map(toUserResponseDTO);
  }

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return toUserResponseDTO(user);
  }

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError('Email is already registered', 400);
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return toUserResponseDTO(user);
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    await this.getUserById(id);

    if (data.email) {
      const userWithEmail = await this.userRepository.findByEmail(data.email);

      if (userWithEmail && userWithEmail.id !== id) {
        throw new AppError('Email is already registered');
      }
    }

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    const updatedUser = await this.userRepository.update(id, data);
    return toUserResponseDTO(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }
}
