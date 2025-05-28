import { IUserService } from '@/interfaces/services/i-user-service';
import { IUserRepository } from '@/interfaces/repositories/i-user-repository';
import {
  ConflictError,
  ConflictErrorDetails,
  NotFoundError,
} from '@/utils/app-error';
import {
  toUserResponseDTO,
  UserResponseDTO,
} from '@/dtos/user/user.output.dto';
import {
  CreateUserBodyDTO,
  UpdateUserBodyDTO,
} from '@/dtos/user/user.input.dto';

export class UserService implements IUserService {
  constructor(private repo: IUserRepository) {}

  async getAll(): Promise<UserResponseDTO[]> {
    const allUsers = await this.repo.findAll();
    return allUsers.map(toUserResponseDTO);
  }

  async getById(id: string): Promise<UserResponseDTO> {
    const persistedUser = await this.repo.findById(id);

    if (!persistedUser) {
      throw new NotFoundError('User not found');
    }

    return toUserResponseDTO(persistedUser);
  }

  async getByEmail(email: string): Promise<UserResponseDTO> {
    const persistedUser = await this.repo.findByEmail(email);

    if (!persistedUser) {
      throw new NotFoundError('User not found');
    }

    return toUserResponseDTO(persistedUser);
  }

  async getByUsername(username: string): Promise<UserResponseDTO> {
    const persistedUser = await this.repo.findByUsername(username);

    if (!persistedUser) {
      throw new NotFoundError('User not found');
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
          message: `Email is already registered`,
        });
      }

      if (existingUsername) {
        details.push({
          field: `username`,
          message: `Username is already registered`,
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
        { field: `username`, message: `Username is already registered` },
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
        { field: `email`, message: `Email is already registered` },
      ]);
    }

    const updatedUser = await this.repo.update(id, { email: newEmail });

    return toUserResponseDTO(updatedUser);
  }

  async updateIsActive(
    id: string,
    newState: boolean,
  ): Promise<UserResponseDTO> {
    const updatedUser = await this.repo.update(id, { isActive: newState });

    return toUserResponseDTO(updatedUser);
  }

  async update(id: string, data: UpdateUserBodyDTO): Promise<UserResponseDTO> {
    await this.getById(id);

    const updatedUser = await this.repo.update(id, data);

    return toUserResponseDTO(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repo.delete(id);
  }
}
