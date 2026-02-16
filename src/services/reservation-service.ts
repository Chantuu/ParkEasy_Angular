import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { InactiveReservationsResponseInterface } from '../utilities/interfaces/responses/inactive-reservations-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private _apiService: ApiService) {}

  getOldReservations() {
    return this._apiService.sendGetRequest<InactiveReservationsResponseInterface>(
      'reservation/inactive',
    );
  }
}
