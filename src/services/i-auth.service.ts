import {
  SigninInput,
  SigninOutput,
  SignupInput,
  SignupOutput,
} from '../dtos/auth.dto';

export interface IAuthService {
  signin(data: SigninInput): Promise<SigninOutput>;
  signup(data: SignupInput): Promise<SignupOutput>;
}
