import { LoginRequestBodyInterface } from './login-request-body.interface';

/**
 * Interface representing the structure of a register request body, which extends the LoginRequestBodyInterface
 * and includes an additional fullName property for the user's full name.
 */
export interface RegisterRequestBodyInterface extends LoginRequestBodyInterface {
  fullName: string;
}
