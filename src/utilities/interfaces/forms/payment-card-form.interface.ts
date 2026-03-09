/**
 * Interface representing the structure of a payment card form, which includes properties for card number,
 * expiration month and year, CCV, and cardholder name.
 */
export interface PaymentCardFormInterface {
  cardNumber: string;
  cardExpirationMonth: number;
  cardExpirationYear: number;
  ccv: number;
  cardHolderName: string;
}
