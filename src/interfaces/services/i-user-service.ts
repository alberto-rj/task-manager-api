import {
  CreateUserBodyDTO,
  UserQueryDTO,
  UpdateUserBodyDTO,
} from '@/dtos/user/user.input.dto';
import {
  UserQueryResponseDTO,
  UserResponseDTO,
} from '@/dtos/user/user.output.dto';
import { UserRole } from '@/models/user.model';

export interface IUserService {
  getAllByQuery(query: UserQueryDTO): Promise<UserQueryResponseDTO>;

  getById(id: string): Promise<UserResponseDTO>;

  getByEmail(email: string): Promise<UserResponseDTO>;

  getByUsername(username: string): Promise<UserResponseDTO>;

  getByIdentifier(identifier: string): Promise<UserResponseDTO>;

  create(data: CreateUserBodyDTO): Promise<UserResponseDTO>;

  update(id: string, data: UpdateUserBodyDTO): Promise<UserResponseDTO>;

  updateUsername(id: string, newUsername: string): Promise<UserResponseDTO>;

  updateEmail(id: string, newEmail: string): Promise<UserResponseDTO>;

  updateIsActive(id: string, newState: boolean): Promise<UserResponseDTO>;

  updateRole(id: string, newRole: UserRole): Promise<UserResponseDTO>;

  delete(id: string): Promise<void>;
}
