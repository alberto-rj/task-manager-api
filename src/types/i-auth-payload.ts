import { JwtPayload } from 'jsonwebtoken';

export interface IAuthPayload extends JwtPayload {
  id: string;
}
