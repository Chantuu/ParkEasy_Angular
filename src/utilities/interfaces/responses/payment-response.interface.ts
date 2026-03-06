import { ReservationEnum } from '../../enums/reservation-status.enum';

/**
 * Interface representing the structure of a payment response object, which includes a status property of type string
 * and a data property that contains paymentStatus and paidAmount. The paymentStatus is of type ReservationEnum,
 * and the paidAmount is a number representing the amount paid.
 */
export interface PaymentResponseInterface {
  status: string;
  data: {
    paymentStatus: ReservationEnum;
    paidAmount: number;
  };
}
