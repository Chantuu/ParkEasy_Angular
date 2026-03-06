import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { ParkingSpotInterface } from '../utilities/interfaces/object-interfaces/parking-spot.interface';

@Injectable({
  providedIn: 'root',
})
/**
 * Service responsible for handling all parking-related operations, such as streaming parking spot data.
 */
export class ParkingService {
  /**
   * Constructor for the ApiService used for injection.
   *
   * @param _apiService - The ApiService for making HTTP requests to the backend API.
   */
  constructor(private _apiService: ApiService) {}

  /**
   * Method for streaming parking spot data from the backend API. It uses the ApiService's streamData method
   * to subscribe to a Server-Sent Events (SSE) endpoint that provides real-time updates of parking spot information.
   *
   * @returns An Observable that emits arrays of ParkingSpotInterface objects, representing the
   * current state of parking spots as updated by the backend.
   */
  streamParkingData() {
    return this._apiService.streamData<ParkingSpotInterface[]>('parking/parkingSpots');
  }
}
