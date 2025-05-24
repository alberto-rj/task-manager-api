import { IAuthPayload } from '@/types/i-auth-payload';

export interface IAuthRequest extends Request {
  user?: IAuthPayload;
}
