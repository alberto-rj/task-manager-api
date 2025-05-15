import { Request, Response } from 'express';

import { IUserService } from '@/services/i-user.service';
import { loginUserSchema } from '@/dtos/user.dto';
import { AppError } from '@/utils/app-error';

export class AuthController {
  constructor(private service: IUserService) {}

  async login(req: Request, res: Response) {
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError('Invalid fields', 400);
    }

    this.service.getByIdentifier(result.data.identifier);
  }

  async register(req: Request, res: Response) {}
}
