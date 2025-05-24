import { CreateUserInput, UpdateUserInput } from '@/dtos/user.dto';
import { User } from '@/models/user-model';

export interface IUserRepository {
  findAll(): Promise<User[]>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findByUsername(username: string): Promise<User | null>;

  findByIdentifier(identifier: string): Promise<User | null>;

  findAllByEmailOrUsername(email: string, username: string): Promise<User[]>;

  create(data: CreateUserInput): Promise<User>;

  update(id: string, data: UpdateUserInput): Promise<User>;

  delete(id: string): Promise<void>;
}
