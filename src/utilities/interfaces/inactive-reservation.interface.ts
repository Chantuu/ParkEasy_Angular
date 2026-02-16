import { ReservationInterface } from './reservation.interface';

export interface InactiveReservationInterface extends ReservationInterface {
  amount: number;
}
