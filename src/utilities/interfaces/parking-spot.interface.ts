import { ParkingSpotStatusEnum } from '../enums/parking-spot-status.enum';

export interface ParkingSpotInterface {
  id: string;
  spotName: string;
  status: ParkingSpotStatusEnum;
  sensorId: string;
  lastUpdated: string;
}
