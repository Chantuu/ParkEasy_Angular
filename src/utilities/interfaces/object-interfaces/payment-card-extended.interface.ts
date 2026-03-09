import { PaymentCardInterface } from './payment-card.interface';

/**
 * Interface representing the structure of an extended payment card object, which includes all properties of the PaymentCardInterface
 * and an additional id property for uniquely identifying the payment card.
 */
export interface PaymentCardExtendedInterface extends PaymentCardInterface {
  id: string;
}
