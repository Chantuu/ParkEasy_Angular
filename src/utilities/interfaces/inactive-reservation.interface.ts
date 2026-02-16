import { ReservationEnum } from '../enums/reservation-status.enum';

export interface InactiveReservationInterface {
  id: string;
  userId: string;
  parkingSpotName: string;
  startTime: string;
  status: ReservationEnum;
  amount: number;
}
