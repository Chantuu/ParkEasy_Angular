export interface DeleteCurrentPaymentCardResponseInterface {
  status: string;
  data: {
    userId: string;
    cardNumber: string;
    cardExpirationMonth: number;
    cardExpirationYear: number;
    cardHolderName: string;
  };
}
