import {
  CreateUserInput,
  toUserOutput,
  UpdateUserInput,
  UserOutput,
} from '@/dtos/user.dto';
import { IUserService } from '@/interfaces/services/i-user-service';
import { IUserRepository } from '@/interfaces/repositories/i-user-repository';
import {
  ConflictError,
  ConflictErrorDetails,
  NotFoundError,
} from '@/utils/app-error';
import { hashPassword } from '@/utils/password-security';

export class UserService implements IUserService {
  constructor(private repo: IUserRepository) {}

  async getAll(): Promise<UserOutput[]> {
    const allUsers = await this.repo.findAll();
    return allUsers.map(toUserOutput);
  }

  async getById(id: string): Promise<UserOutput> {
    const persistedUser = await this.repo.findById(id);

    if (!persistedUser) {
      throw new NotFoundError('User not found');
    }

    return toUserOutput(persistedUser);
  }

  async getByEmail(email: string): Promise<UserOutput> {
    const persistedUser = await this.repo.findByEmail(email);

    if (!persistedUser) {
      throw new NotFoundError('User not found');
    }

    return toUserOutput(persistedUser);
  }

  async getByUsername(username: string): Promise<UserOutput> {
    const persistedUser = await this.repo.findByUsername(username);

    if (!persistedUser) {
      throw new NotFoundError('User not found');
    }

    return toUserOutput(persistedUser);
  }

  async getByIdentifier(identifier: string): Promise<UserOutput> {
    const persistedUser = await this.repo.findByIdentifier(identifier);

    if (!persistedUser) {
      throw new NotFoundError('User not found');
    }

    return toUserOutput(persistedUser);
  }

  async getAllByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<UserOutput[]> {
    const persistedUsers = await this.repo.findAllByEmailOrUsername(
      email,
      username,
    );

    return persistedUsers.map(toUserOutput);
  }

  async create(data: CreateUserInput): Promise<UserOutput> {
    const persistedUsers = await this.repo.findAllByEmailOrUsername(
      data.email,
      data.username,
    );

    const emailAlreadyExists = persistedUsers.some(
      (user) => user.email === data.email,
    );

    const usernameAlreadyExists = persistedUsers.some(
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

  private async checkIdentifiersOnUpdate(
    data: { email: string; username: string },
    userToUpdate: { id: string; email: string; username: string },
  ) {
    const persistedUsers = await this.repo.findAllByEmailOrUsername(
      data.email,
      data.username,
    );
    const emailAlreadyExists = persistedUsers.some(
      (user) =>
        user.email === userToUpdate.email && user.id !== userToUpdate.id,
    );
    const usernameAlreadyExists = persistedUsers.some(
      (user) =>
        user.username === userToUpdate.username && user.id !== userToUpdate.id,
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
  }

  private async checkEmailOnUpdate(
    email: string,
    userToUpdate: { id: string; email: string },
  ) {
    const persistedUser = await this.repo.findByEmail(email);
    if (
      persistedUser &&
      persistedUser.email === userToUpdate.email &&
      persistedUser.id !== userToUpdate.id
    ) {
      throw new ConflictError([
        { field: `email`, message: `Email is already registered` },
      ]);
    }
  }

  private async checkUsernameOnUpdate(
    username: string,
    userToUpdate: { id: string; username: string },
  ) {
    const persistedUser = await this.repo.findByUsername(username);
    if (
      persistedUser &&
      persistedUser.username === userToUpdate.username &&
      persistedUser.id !== userToUpdate.id
    ) {
      throw new ConflictError([
        { field: `username`, message: `Username is already registered` },
      ]);
    }
  }

  async updateById(id: string, data: UpdateUserInput): Promise<UserOutput> {
    const userToUpdate = await this.getById(id);

    if (typeof data.email === 'string' && typeof data.username === 'string') {
      await this.checkIdentifiersOnUpdate(
        { email: data.email, username: data.username },
        {
          email: userToUpdate.email,
          username: userToUpdate.email,
          id: userToUpdate.id,
        },
      );
    } else if (typeof data.email === 'string') {
      await this.checkEmailOnUpdate(data.email, {
        email: userToUpdate.email,
        id: userToUpdate.id,
      });
    } else if (typeof data.username === 'string') {
      await this.checkUsernameOnUpdate(data.username, {
        username: userToUpdate.username,
        id: userToUpdate.id,
      });
    }

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
