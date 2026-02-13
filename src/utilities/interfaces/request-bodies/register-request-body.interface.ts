import { LoginRequestBodyInterface } from './login-request-body.interface';

export interface RegisterRequestBodyInterface extends LoginRequestBodyInterface {
  fullName: string;
}
