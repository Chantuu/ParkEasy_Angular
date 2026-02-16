import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { InactiveReservationsResponseInterface } from '../utilities/interfaces/responses/inactive-reservations-response.interface';
import { ReservationInterface } from '../utilities/interfaces/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private _apiService: ApiService) {}

  getActiveReservation() {
    return this._apiService.streamData<ReservationInterface | 'null'>('reservation');
  }

  getOldReservations() {
    return this._apiService.sendGetRequest<InactiveReservationsResponseInterface>(
      'reservation/inactive',
    );
  }
}
