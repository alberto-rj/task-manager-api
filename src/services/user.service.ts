import { IUserService } from '@/interfaces/services/i-user-service';
import { IUserRepository } from '@/interfaces/repositories/i-user-repository';
import {
  ConflictError,
  ConflictErrorDetails,
  NotFoundError,
} from '@/utils/app-error';
import {
  toUserQueryResponseDTO,
  toUserResponseDTO,
  UserQueryResponseDTO,
  UserResponseDTO,
} from '@/dtos/user/user.output.dto';
import {
  CreateUserBodyDTO,
  UserQueryDTO,
  UpdateUserBodyDTO,
} from '@/dtos/user/user.input.dto';
import { UserRole } from '@/models/user.model';

export class UserService implements IUserService {
  constructor(private repo: IUserRepository) {}

  async getAllByQuery(query: UserQueryDTO): Promise<UserQueryResponseDTO> {
    const result = await this.repo.findAllByQuery(query);
    return toUserQueryResponseDTO(result, query);
  }

  async getById(id: string): Promise<UserResponseDTO> {
    const persistedUser = await this.repo.findById(id);

    if (!persistedUser) {
      throw new NotFoundError('User not found.');
    }

    return toUserResponseDTO(persistedUser);
  }

  async getByEmail(email: string): Promise<UserResponseDTO> {
    const persistedUser = await this.repo.findByEmail(email);

    if (!persistedUser) {
      throw new NotFoundError('User not found.');
    }

    return toUserResponseDTO(persistedUser);
  }

  async getByUsername(username: string): Promise<UserResponseDTO> {
    const persistedUser = await this.repo.findByUsername(username);

    if (!persistedUser) {
      throw new NotFoundError('User not found.');
    }

    return toUserResponseDTO(persistedUser);
  }

  async getByIdentifier(identifier: string): Promise<UserResponseDTO> {
    const persistedUser = await this.repo.findByIdentifier(identifier);

    if (!persistedUser) {
      throw new NotFoundError('User not found');
    }

    return toUserResponseDTO(persistedUser);
  }

  async create(data: CreateUserBodyDTO): Promise<UserResponseDTO> {
    const persistedUsers = await this.repo.findAllWithSomeIdentifier({
      email: data.email,
      username: data.username,
    });

    const existingEmail = persistedUsers.some(
      (user) => user.email === data.email,
    );

    const existingUsername = persistedUsers.some(
      (user) => user.username === data.username,
    );

    if (existingEmail || existingUsername) {
      const details: ConflictErrorDetails[] = [];

      if (existingEmail) {
        details.push({
          field: `email`,
          message: `email is already registered.`,
        });
      }

      if (existingUsername) {
        details.push({
          field: `username`,
          message: `username is already registered.`,
        });
      }

      throw new ConflictError(details);
    }

    const createdUser = await this.repo.create(data);

    return toUserResponseDTO(createdUser);
  }

  async updateUsername(
    id: string,
    newUsername: string,
  ): Promise<UserResponseDTO> {
    const userToUpdate = await this.getById(id);

    const persistedUser = await this.repo.findByUsername(newUsername);

    if (
      persistedUser &&
      persistedUser.username === userToUpdate.username &&
      persistedUser.id !== userToUpdate.id
    ) {
      throw new ConflictError([
        { field: `username`, message: `username is already registered.` },
      ]);
    }

    const updatedUser = await this.repo.update(id, { username: newUsername });

    return toUserResponseDTO(updatedUser);
  }

  async updateEmail(id: string, newEmail: string): Promise<UserResponseDTO> {
    const userToUpdate = await this.getById(id);

    const persistedUser = await this.repo.findByEmail(newEmail);

    if (
      persistedUser &&
      persistedUser.email === userToUpdate.email &&
      persistedUser.id !== userToUpdate.id
    ) {
      throw new ConflictError([
        { field: `email`, message: `email is already registered.` },
      ]);
    }

    const updatedUser = await this.repo.update(id, { email: newEmail });

    return toUserResponseDTO(updatedUser);
  }

  async updateRole(id: string, newRole: UserRole): Promise<UserResponseDTO> {
    const updatedUser = await this.repo.update(id, { role: newRole });
    return toUserResponseDTO(updatedUser);
  }

  async updateIsActive(
    id: string,
    isActive: boolean,
  ): Promise<UserResponseDTO> {
    const updatedUser = await this.repo.update(id, { isActive });
    return toUserResponseDTO(updatedUser);
  }

  async update(id: string, data: UpdateUserBodyDTO): Promise<UserResponseDTO> {
    const updatedUser = await this.repo.update(id, data);

    return toUserResponseDTO(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
