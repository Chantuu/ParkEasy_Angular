import { ReservationInterface } from '../reservation.interface';

export interface CreateReservationResponseInterface {
  status: string;
  data: ReservationInterface;
}
