import { IUser } from '@/models/user';
import { CreateUserDTO } from '@/dtos/requests/create-user-dto';
import { UpdateUserDTO } from '@/dtos/requests/update-user-dto';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;

  findById(id: string): Promise<IUser | null>;

  findByEmail(email: string): Promise<IUser | null>;

  findByUsername(username: string): Promise<IUser | null>;

  create(data: CreateUserDTO): Promise<IUser>;

  update(id: string, data: UpdateUserDTO): Promise<IUser>;

  delete(id: string): Promise<void>;
}
