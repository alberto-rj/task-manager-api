import {
  CreateUserInput,
  toUserOutput,
  UpdateUserInput,
  UserOutput,
} from '../dtos/user.dto';
import { IUserService } from './i-user.service';
import { IUserRepository } from '../repositories/i-user.repository';
import {
  ConflictError,
  ConflictErrorDetails,
  NotFoundError,
} from '../utils/app-error';
import { hashPassword } from '../utils/password-security';

export class UserService implements IUserService {
  constructor(private repo: IUserRepository) {}

  async getAll(): Promise<UserOutput[]> {
    const allUsers = await this.repo.findAll();
    return allUsers.map(toUserOutput);
  }

  async getById(id: string): Promise<UserOutput> {
    const filteredUser = await this.repo.findById(id);

    if (!filteredUser) {
      throw new NotFoundError('User not found');
    }

    return toUserOutput(filteredUser);
  }

  async getByEmail(email: string): Promise<UserOutput> {
    const filteredUser = await this.repo.findByEmail(email);

    if (!filteredUser) {
      throw new NotFoundError('User not found');
    }

    return toUserOutput(filteredUser);
  }

  async getByUsername(username: string): Promise<UserOutput> {
    const filteredUser = await this.repo.findByUsername(username);

    if (!filteredUser) {
      throw new NotFoundError('User not found');
    }

    return toUserOutput(filteredUser);
  }

  async getByIdentifier(identifier: string): Promise<UserOutput> {
    const filteredUser = await this.repo.findByIdentifier(identifier);

    if (!filteredUser) {
      throw new NotFoundError('User not found');
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
      const details: ConflictErrorDetails[] = [];

      if (emailAlreadyExists) {
        details.push({
          field: `email`,
          message: `Email is already registered`,
        });
      }

      if (usernameAlreadyExists) {
        details.push({
          field: `username`,
          message: `Username is already registered`,
        });
      }

      throw new ConflictError(details);
    }

    const hashedPassword = await hashPassword(data.password);

    const createdUser = await this.repo.create({
      ...data,
      password: hashedPassword,
    });

    return toUserOutput(createdUser);
  }

  async updateById(id: string, data: UpdateUserInput): Promise<UserOutput> {
    await this.getById(id);

    const updatedPassword =
      typeof data.password === 'string'
        ? await hashPassword(data.password)
        : data.password;

    const updatedUser = await this.repo.update(id, {
      ...data,
      password: updatedPassword,
    });

    return toUserOutput(updatedUser);
  }

  async deleteById(id: string): Promise<void> {
    await this.getById(id);
    await this.repo.delete(id);
  }
}
