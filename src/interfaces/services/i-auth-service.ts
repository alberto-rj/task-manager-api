import {
  RefreshTokenInput,
  RefreshTokenOutput,
  SigninInput,
  SigninOutput,
  SignupInput,
  SignupOutput,
} from '../../dtos/auth/auth.dto';

export interface IAuthService {
  signin(data: SigninInput): Promise<SigninOutput>;

  signup(data: SignupInput): Promise<SignupOutput>;

  refreshToken(data: RefreshTokenInput): Promise<RefreshTokenOutput>;

  logout(data: RefreshTokenInput): Promise<void>;
}
