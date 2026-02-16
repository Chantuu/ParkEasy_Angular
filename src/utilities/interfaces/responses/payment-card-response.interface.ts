import { PaymentCardInterface } from '../payment-card.interface';

export interface PaymentCardResponseInterface {
  status: string;
  data: PaymentCardInterface;
}
