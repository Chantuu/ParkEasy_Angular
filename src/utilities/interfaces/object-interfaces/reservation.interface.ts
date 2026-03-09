import { ReservationEnum } from '../../enums/reservation-status.enum';

/**
 * Interface representing the structure of a reservation object, which includes properties such as id, userId, parkingSpotName,
 * startTime, and status. The status property is of type ReservationEnum.
 */
export interface ReservationInterface {
  id: string;
  userId: string;
  parkingSpotName: string;
  startTime: string;
  status: ReservationEnum;
}
