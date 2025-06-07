import { JwtPayload } from 'jsonwebtoken';

import { UserRole } from '@/models/user.model';

export interface IAuthPayload extends JwtPayload {
  id: string;
  role: UserRole;
}
