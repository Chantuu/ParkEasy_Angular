import { ReservationPriceInterface } from '../reservation-price.interface';

export interface CalculateReservationPriceResponseInterface {
  status: string;
  data: ReservationPriceInterface;
}
