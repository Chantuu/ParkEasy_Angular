import { UserInterface } from '../user.interface';

export interface AuthResponseInterface {
  status: string;
  data: UserInterface;
  message: string;
}
