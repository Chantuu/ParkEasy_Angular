import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { InactiveReservationsResponseInterface } from '../utilities/interfaces/responses/inactive-reservations-response.interface';
import { ReservationInterface } from '../utilities/interfaces/reservation.interface';
import { ReservationCreationBodyInterface } from '../utilities/interfaces/request-bodies/reservation-creation-body.interface';
import { CreateReservationResponseInterface } from '../utilities/interfaces/responses/create-reservation-response.interface';

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
      CreateReservationResponseInterface
    >('reservation', {
      parkingSpotId,
    });
  }

  getOldReservations() {
    return this._apiService.sendGetRequest<InactiveReservationsResponseInterface>(
      'reservation/inactive',
    );
  }
}
