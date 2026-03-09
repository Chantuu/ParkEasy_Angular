/**
 * Interface representing the structure of a payment card object, which includes properties such as userId, cardNumber,
 * cardExpirationMonth, cardExpirationYear, and cardHolderName.
 */
export interface PaymentCardInterface {
  userId: string;
  cardNumber: string;
  cardExpirationMonth: number;
  cardExpirationYear: number;
  cardHolderName: string;
}
