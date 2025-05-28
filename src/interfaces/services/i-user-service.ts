import {
  CreateUserBodyDTO,
  UpdateUserBodyDTO,
} from '@/dtos/user/user.input.dto';
import { UserResponseDTO } from '@/dtos/user/user.output.dto';

export interface IUserService {
  getAll(): Promise<UserResponseDTO[]>;

  getById(id: string): Promise<UserResponseDTO>;

  getByEmail(email: string): Promise<UserResponseDTO>;

  getByUsername(username: string): Promise<UserResponseDTO>;

  getByIdentifier(identifier: string): Promise<UserResponseDTO>;

  create(data: CreateUserBodyDTO): Promise<UserResponseDTO>;

  update(id: string, data: UpdateUserBodyDTO): Promise<UserResponseDTO>;

  updateUsername(id: string, newUsername: string): Promise<UserResponseDTO>;

  updateEmail(id: string, newEmail: string): Promise<UserResponseDTO>;

  delete(id: string): Promise<void>;
}
