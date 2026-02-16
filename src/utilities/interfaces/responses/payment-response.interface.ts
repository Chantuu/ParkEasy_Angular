import { ReservationEnum } from '../../enums/reservation-status.enum';

export interface PaymentResponseInterface {
  status: string;
  data: {
    paymentStatus: ReservationEnum;
    paidAmount: number;
  };
}
