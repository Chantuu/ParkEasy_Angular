/**
 * Interface representing the structure of a reservation price object, which includes properties such as startTime,
 * endTime, amountToPay, and currency.
 */
export interface ReservationPriceInterface {
  startTime: string;
  endTime: string;
  amountToPay: number;
  currency: string;
}
