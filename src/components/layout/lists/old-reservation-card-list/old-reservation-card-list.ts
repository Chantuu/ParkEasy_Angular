import { Component, inject, OnInit, signal } from '@angular/core';
import { OldReservationCard } from '../../../ui/reservation/old-reservation-card/old-reservation-card';
import { InactiveReservationInterface } from '../../../../utilities/interfaces/object-interfaces/inactive-reservation.interface';
import { ReservationService } from '../../../../services/reservation-service';
import { Subscription } from 'rxjs';
import { GenericResponseInterface } from '../../../../utilities/interfaces/responses/generic-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-old-reservation-card-list',
  imports: [OldReservationCard],
  templateUrl: './old-reservation-card-list.html',
  styleUrl: './old-reservation-card-list.css',
})
export class OldReservationCardList implements OnInit {
  /**
   * Injected instance of ReservationService, used to fetch old reservations and subscribe to refresh events.
   */
  private _reservationService = inject(ReservationService);

  /**
   * Subscription object, used to unsubscribe on component destruction to prevent memory leaks.
   */
  private _refreshSubscription!: Subscription;

  /**
   * Signal containing array of inactive reservations.
   */
  inactiveReservations = signal<InactiveReservationInterface[]>([]);

  /**
   * Lifecycle hook called on component initialization, which fetches old reservations
   * and subscribes to refresh events from ReservationService to update the list of old reservations
   * when needed.
   */
  ngOnInit() {
    /* Initial fetch of old reservations on component initialization */
    this._reservationService.getOldReservations().subscribe({
      next: this.handleResponseFunction.bind(this),
      error: this.handleResponseErrorFunction.bind(this),
    });

    /* Subscribe to refresh events from ReservationService to update old reservations list when needed */
    this._refreshSubscription = this._reservationService.refreshRequired$.subscribe(() => {
      this._reservationService.getOldReservations().subscribe({
        next: this.handleResponseFunction.bind(this),
        error: this.handleResponseErrorFunction.bind(this),
      });
    });
  }

  /**
   * Lifecycle hook called on component destruction, which unsubscribes from refresh events to prevent memory leaks.
   */
  ngOnDestroy() {
    this._refreshSubscription.unsubscribe();
  }

  /**
   * Helper function to handle successful response from getOldReservations API call,
   * updates the inactiveReservations signal with the received data.
   *
   * @param response - Object containing array of inactive reservations received from the API call.
   */
  private handleResponseFunction(
    response: GenericResponseInterface<InactiveReservationInterface[]>,
  ) {
    this.inactiveReservations.set(response.data);
  }

  /**
   * Helper function to handle error response from getOldReservations API call,
   * clears the inactiveReservations signal and logs the error to the console.
   *
   * @param error - HttpErrorResponse object containing details of the error occurred during the API call.
   */
  private handleResponseErrorFunction(error: HttpErrorResponse) {
    this.inactiveReservations.set([]);
    console.error(error);
  }
}
