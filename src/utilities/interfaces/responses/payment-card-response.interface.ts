import { PaymentCardInterface } from '../payment-card.interface';

export interface PaymentCardResponse {
  status: string;
  data: PaymentCardInterface;
}
