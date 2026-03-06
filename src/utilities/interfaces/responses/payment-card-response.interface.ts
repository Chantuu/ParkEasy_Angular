import { PaymentCardExtendedInterface } from '../object-interfaces/payment-card-extended.interface';

/**
 * Interface representing the structure of a payment card response object, which includes a status property of type string
 * and a data property of type PaymentCardExtendedInterface.
 */
export interface PaymentCardResponseInterface {
  status: string;
  data: PaymentCardExtendedInterface;
}
