import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { ReservationInterface } from '../utilities/interfaces/object-interfaces/reservation.interface';
import { ReservationCreationBodyInterface } from '../utilities/interfaces/request-bodies/reservation-creation-body.interface';
import { GenericResponseInterface } from '../utilities/interfaces/responses/generic-response.interface';
import { InactiveReservationInterface } from '../utilities/interfaces/object-interfaces/inactive-reservation.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Service responsible for handling all reservation-related operations, such as fetching the active reservation,
 * creating a new reservation, and fetching old reservations.
 */
export class ReservationService {
  /**
   * Constructor for the ApiService used for injection.
   *
   * @param _apiService - The ApiService for making HTTP requests to the backend API.
   */
  constructor(private _apiService: ApiService) {}

  /**
   * Private property containing a BehaviorSubject that is used to trigger refreshes for
   * updating reservation data.
   */
  private _refreshRequired = new BehaviorSubject<void>(undefined);

  /**
   * Public observable that components can subscribe to in order to be notified when
   * a refresh is required for updating reservation data.
   */
  refreshRequired$ = this._refreshRequired.asObservable();

  /**
   * Method for triggering a refresh, which emits a new value on the _refreshRequired BehaviorSubject.
   */
  triggerRefresh() {
    this._refreshRequired.next();
  }

  /**
   * Method for fetching the active reservation data from the backend API. It uses the ApiService's streamData method.
   *
   * @returns An Observable that emits the active reservation data from the API, which can be a ReservationInterface object or 'null' if there is no active reservation.
   */
  getActiveReservation() {
    return this._apiService.streamData<ReservationInterface | 'null'>('reservation');
  }

  /**
   * Method for creating a new active reservation. It takes the ID of the parking spot as a parameter,
   * sends a POST request to the backend API, and returns the response.
   *
   * @param parkingSpotId - The ID of the parking spot for which to create the reservation, typed as a string.
   * @returns An Observable that emits the response from the API, which includes the created reservation data if the request is successful.
   */
  createActiveReservation(parkingSpotId: string) {
    return this._apiService.sendPostRequest<
      ReservationCreationBodyInterface,
      GenericResponseInterface<ReservationInterface>
    >('reservation', {
      parkingSpotId,
    });
  }

  /**
   * Method for fetching the old reservation data from the backend API. It sends a GET request to the appropriate endpoint
   * and returns the response.
   *
   * @returns An Observable that emits the old reservation data from the API.
   */
  getOldReservations() {
    return this._apiService.sendGetRequest<
      GenericResponseInterface<InactiveReservationInterface[]>
    >('reservation/inactive');
  }
}
