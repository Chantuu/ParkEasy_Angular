import { ReservationEnum } from '../enums/reservation-status.enum';

export interface ReservationInterface {
  id: string;
  userId: string;
  parkingSpotName: string;
  startTime: string;
  status: ReservationEnum;
}
