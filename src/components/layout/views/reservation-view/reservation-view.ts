import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { OldReservationCardList } from '../../lists/old-reservation-card-list/old-reservation-card-list';
import { ActiveReservationCard } from '../../../ui/reservation/active-reservation-card/active-reservation-card';
import { ReservationInterface } from '../../../../utilities/interfaces/object-interfaces/reservation.interface';
import { ReservationService } from '../../../../services/reservation-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-view',
  imports: [OldReservationCardList, ActiveReservationCard],
  templateUrl: './reservation-view.html',
  styleUrl: './reservation-view.css',
  host: {
    class: 'globalContainerXMargin',
  },
})
export class ReservationView implements OnInit, OnDestroy {
  /**
   * Injected instance of ReservationService, used to fetch active reservation data and subscribe to updates.
   */
  private _reservationService = inject(ReservationService);

  /**
   * Subscription object, used to unsubscribe on component destruction to prevent memory leaks.
   */
  private subscription!: Subscription;

  /**
   * Signal containing the currently active reservation.
   */
  activeReservationData = signal<ReservationInterface | null>(null);

  /**
   * Lifecycle hook called on component initialization, which subscribes to the active reservation
   * data stream from ReservationService to receive real-time updates of the user's active reservation information.
   */
  ngOnInit() {
    this.subscription = this._reservationService.getActiveReservation().subscribe({
      next: (data) => {
        const currentData = data;

        // If the received data is the string 'null', parse it as null and set the activeReservationData signal to null.
        // Otherwise, set the activeReservationData signal to the received reservation data.
        if (currentData === 'null') {
          const parsedData = JSON.parse(currentData) as null;
          this.activeReservationData.set(parsedData);
        } else {
          this.activeReservationData.set(currentData);
        }
      },
      // On error, set the activeReservationData signal to null and log the error to the console.
      error: (error) => {
        this.activeReservationData.set(null);
        console.error(error);
      },
    });
  }

  /**
   * On component destruction, unsubscribes from the active reservation data stream to prevent memory leaks.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
