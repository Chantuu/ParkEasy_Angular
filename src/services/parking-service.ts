import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { ParkingSpotInterface } from '../utilities/interfaces/object-interfaces/parking-spot.interface';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private _apiService: ApiService) {}

  streamParkingData() {
    return this._apiService.streamData<ParkingSpotInterface[]>('parking/parkingSpots');
  }
}
