import { PaymentCardExtendedInterface } from '../object-interfaces/payment-card-extended.interface';

export interface PaymentCardResponseInterface {
  status: string;
  data: PaymentCardExtendedInterface;
}
