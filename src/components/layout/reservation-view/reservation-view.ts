import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { OldReservationCardList } from '../old-reservation-card-list/old-reservation-card-list';
import { ActiveReservationCard } from '../../ui/active-reservation-card/active-reservation-card';
import { ReservationInterface } from '../../../utilities/interfaces/object-interfaces/reservation.interface';
import { ReservationService } from '../../../services/reservation-service';
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
  private _reservationService = inject(ReservationService);

  activeReservationData = signal<ReservationInterface | null>(null);

  private subscription!: Subscription;

  ngOnInit() {
    this.subscription = this._reservationService.getActiveReservation().subscribe({
      next: (data) => {
        const currentData = data;

        if (currentData === 'null') {
          const parsedData = JSON.parse(currentData) as null;
          this.activeReservationData.set(parsedData);
        } else {
          this.activeReservationData.set(currentData as ReservationInterface);
        }
      },
      error: (error) => {
        this.activeReservationData.set(null);
        console.error(error);
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
