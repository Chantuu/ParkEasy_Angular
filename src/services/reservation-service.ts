import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { ReservationInterface } from '../utilities/interfaces/object-interfaces/reservation.interface';
import { ReservationCreationBodyInterface } from '../utilities/interfaces/request-bodies/reservation-creation-body.interface';
import { GenericResponseInterface } from '../utilities/interfaces/responses/generic-response.interface';
import { InactiveReservationInterface } from '../utilities/interfaces/object-interfaces/inactive-reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private _apiService: ApiService) {}

  getActiveReservation() {
    return this._apiService.streamData<ReservationInterface | 'null'>('reservation');
  }

  createActiveReservation(parkingSpotId: string) {
    return this._apiService.sendPostRequest<
      ReservationCreationBodyInterface,
      GenericResponseInterface<ReservationInterface>
    >('reservation', {
      parkingSpotId,
    });
  }

  getOldReservations() {
    return this._apiService.sendGetRequest<
      GenericResponseInterface<InactiveReservationInterface[]>
    >('reservation/inactive');
  }
}
