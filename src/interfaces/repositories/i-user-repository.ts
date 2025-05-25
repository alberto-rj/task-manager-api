import {
  UserEntriesDTO,
  UserChangesDTO,
  UserIdentifiersDTO,
} from '@/dtos/user/user.input.dto';
import { User } from '@/models/user.model';

export interface IUserRepository {
  findAll(): Promise<User[]>;

  findAllWithSomeIdentifier(data: UserIdentifiersDTO): Promise<User[]>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findByUsername(username: string): Promise<User | null>;

  findByIdentifier(identifier: string): Promise<User | null>;

  create(data: UserEntriesDTO): Promise<User>;

  update(id: string, data: UserChangesDTO): Promise<User>;

  delete(id: string): Promise<void>;
}
