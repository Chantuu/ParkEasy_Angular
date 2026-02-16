import { InactiveReservationInterface } from '../inactive-reservation.interface';

export interface InactiveReservationsResponseInterface {
  status: string;
  data: InactiveReservationInterface[];
}
