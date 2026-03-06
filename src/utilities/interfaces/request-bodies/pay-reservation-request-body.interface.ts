import { ReservationEnum } from '../../enums/reservation-status.enum';

/**
 * Interface representing the structure of a pay reservation request body, which includes properties for reservationStatus
 * and an optional amount. The reservationStatus property is of type ReservationEnum, and the amount property is a number
 * that may be included in the request body.
 */
export interface PayReservationRequestBodyInterface {
  reservationStatus: ReservationEnum;
  amount?: number;
}
