import { Response } from 'express';

import { IUserService } from '@/interfaces/services/i-user-service';
import { IAuthRequest } from '@/dtos/auth.dto';

export class UserController {
  constructor(private service: IUserService) {}

  async getProfile(req: IAuthRequest, res: Response): Promise<Response> {
    const { user } = req;
    return res.json(user);
  }

  async updateProfile(req: IAuthRequest, res: Response): Promise<Response> {
    return res.status(200);
  }
}
