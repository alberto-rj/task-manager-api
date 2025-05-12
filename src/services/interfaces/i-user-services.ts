import { CreateUserDTO } from '@/dtos/requests/create-user-dto';
import { UpdateUserDTO } from '@/dtos/requests/update-user-dto';
import { UserResponseDTO } from '@/dtos/responses/user-response-dto';

export interface IUserService {
  getAllUsers(): Promise<UserResponseDTO[]>;

  getUserById(id: string): Promise<UserResponseDTO>;

  createUser(data: CreateUserDTO): Promise<UserResponseDTO>;

  updateUser(id: string, data: UpdateUserDTO): Promise<UserResponseDTO>;

  deleteUser(id: string): Promise<void>;
}
