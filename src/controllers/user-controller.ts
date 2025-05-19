import { Response } from 'express';

import { IUserService } from '../services/i-user-service';
import { AuthRequest } from './i-auth-request';
import { updateUserInputSchema } from '../dtos/user.dto';
import { AppError } from '../utils/app-error';

export class UserController {
  constructor(private service: IUserService) {}

  async getProfile(req: AuthRequest, res: Response): Promise<Response> {
    const { user } = req;
    return res.json(user);
  }

  async updateProfile(req: AuthRequest, res: Response): Promise<Response> {
    const { user } = req;
    const result = updateUserInputSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(result.error.message, 400);
    }

    const updatedUser = await this.service.updateById(user!.id, result.data);

    return res.status(200).json(updatedUser);
  }
}
