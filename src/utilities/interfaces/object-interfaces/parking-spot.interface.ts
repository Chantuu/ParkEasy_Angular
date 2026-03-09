import { ParkingSpotStatusEnum } from '../../enums/parking-spot-status.enum';

/**
 * Interface representing the structure of a parking spot object, which includes properties such as id, spotName, status,
 * sensorId, and lastUpdated. The status property is of type ParkingSpotStatusEnum.
 */
export interface ParkingSpotInterface {
  id: string;
  spotName: string;
  status: ParkingSpotStatusEnum;
  sensorId: string;
  lastUpdated: string;
}
