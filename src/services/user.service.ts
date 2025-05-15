import { IUserRepository } from '../repositories/i-user.repository';
import {
  CreateUserInput,
  toUserOutput,
  UpdateUserInput,
  UserOutput,
} from '../dtos/user.dto';
import { IUserService } from './i-user.service';
import { AppError } from '../utils/app-error';

export class UserService implements IUserService {
  constructor(private repo: IUserRepository) {}

  async getAll(): Promise<UserOutput[]> {
    const allUsers = await this.repo.findAll();
    return allUsers.map(toUserOutput);
  }

  async getById(id: string): Promise<UserOutput> {
    const filteredUser = await this.repo.findById(id);

    if (!filteredUser) {
      throw new AppError('User not found', 404);
    }

    return toUserOutput(filteredUser);
  }

  async getByEmail(email: string): Promise<UserOutput> {
    const filteredUser = await this.repo.findByEmail(email);

    if (!filteredUser) {
      throw new AppError('User not found', 404);
    }

    return toUserOutput(filteredUser);
  }

  async getByUsername(username: string): Promise<UserOutput> {
    const filteredUser = await this.repo.findByUsername(username);

    if (!filteredUser) {
      throw new AppError('User not found', 404);
    }

    return toUserOutput(filteredUser);
  }

  async getAllByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<UserOutput[]> {
    const filteredUsers = await this.repo.findAllByEmailOrUsername(
      email,
      username,
    );

    return filteredUsers.map(toUserOutput);
  }

  async create(data: CreateUserInput): Promise<UserOutput> {
    const filteredUsers = await this.repo.findAllByEmailOrUsername(
      data.email,
      data.username,
    );

    const emailAlreadyExists = filteredUsers.some(
      (user) => user.email === data.email,
    );

    const usernameAlreadyExists = filteredUsers.some(
      (user) => user.username === data.username,
    );

    if (emailAlreadyExists || usernameAlreadyExists) {
      const errors: Record<string, string> = {};

      if (emailAlreadyExists) {
        errors.email = `Email already exists`;
      }

      if (usernameAlreadyExists) {
        errors.username = `Username already exists`;
      }

      throw { status: 409, errors };
    }

    const createdUser = await this.repo.create(data);
    return toUserOutput(createdUser);
  }

  async updateById(id: string, data: UpdateUserInput): Promise<UserOutput> {
    await this.getById(id);

    const updatedUser = await this.repo.update(id, data);

    return toUserOutput(updatedUser);
  }

  async deleteById(id: string): Promise<void> {
    await this.getById(id);
    await this.repo.delete(id);
  }
}
