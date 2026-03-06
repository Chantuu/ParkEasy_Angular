import { ReservationInterface } from './reservation.interface';

/**
 * Interface representing the structure of an inactive reservation object,
 * which extends the ReservationInterface and includes an additional amount property for the payment amount.
 */
export interface InactiveReservationInterface extends ReservationInterface {
  amount: number;
}
