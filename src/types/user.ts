import { User } from '@/models/user.model';

export type UserResult = {
  total: number;
  users: User[];
};
