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
  _reservationService = inject(ReservationService);

  inactiveReservations = signal<InactiveReservationInterface[]>([]);

  private _refreshSubscription!: Subscription;

  ngOnInit() {
    this._reservationService.getOldReservations().subscribe({
      next: this.handleResponseFunction.bind(this),
      error: this.handleResponseErrorFunction.bind(this),
    });

    this._refreshSubscription = this._reservationService.refreshRequired$.subscribe(() => {
      this._reservationService.getOldReservations().subscribe({
        next: this.handleResponseFunction.bind(this),
        error: this.handleResponseErrorFunction.bind(this),
      });
    });
  }

  ngOnDestroy() {
    this._refreshSubscription.unsubscribe();
  }

  private handleResponseFunction(
    response: GenericResponseInterface<InactiveReservationInterface[]>,
  ) {
    this.inactiveReservations.set(response.data);
  }

  private handleResponseErrorFunction(error: HttpErrorResponse) {
    this.inactiveReservations.set([]);
    console.error(error);
  }
}
