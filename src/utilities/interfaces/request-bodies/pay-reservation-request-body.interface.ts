import { ReservationEnum } from '../../enums/reservation-status.enum';

export interface PayReservationRequestBodyInterface {
  reservationStatus: ReservationEnum;
  amount?: number;
}
