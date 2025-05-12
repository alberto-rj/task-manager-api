import { Request, Response } from 'express';
import { IUserService } from '@/services/interfaces/i-user-services';
import { createUserSchema } from '@/dtos/requests/create-user-dto';

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const users = await this.userService.getAllUsers();
    return res.json(users);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    return res.json(user);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(result.error.message, 400);
    }

    const user = await this.userService.createUser(result.data);
    return res.status(201).json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const result = updateUserSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(result.error.message, 400);
    }

    const user = await this.userService.updateUser(id, result.data);
    return res.json(user);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.userService.deleteUser(id);
    return res.status(204).send();
  }
}
