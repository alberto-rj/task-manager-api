import {
  CreateUserInput,
  UpdateUserInput,
  UserOutput,
} from '../../dtos/user.dto';

export interface IUserService {
  getAll(): Promise<UserOutput[]>;

  getById(id: string): Promise<UserOutput>;

  getByEmail(email: string): Promise<UserOutput>;

  getByUsername(username: string): Promise<UserOutput>;

  getByIdentifier(username: string): Promise<UserOutput>;

  getAllByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<UserOutput[]>;

  create(data: CreateUserInput): Promise<UserOutput>;

  updateById(id: string, data: UpdateUserInput): Promise<UserOutput>;

  deleteById(id: string): Promise<void>;
}
