import { Component, inject, OnInit, signal } from '@angular/core';
import { OldReservationCard } from '../../ui/old-reservation-card/old-reservation-card';
import { InactiveReservationInterface } from '../../../utilities/interfaces/object-interfaces/inactive-reservation.interface';
import { ReservationService } from '../../../services/reservation-service';

@Component({
  selector: 'app-old-reservation-card-list',
  imports: [OldReservationCard],
  templateUrl: './old-reservation-card-list.html',
  styleUrl: './old-reservation-card-list.css',
})
export class OldReservationCardList implements OnInit {
  _reservationService = inject(ReservationService);

  inactiveReservations = signal<InactiveReservationInterface[]>([]);

  ngOnInit() {
    this._reservationService.getOldReservations().subscribe({
      next: (response) => {
        this.inactiveReservations.set(response.data);
      },
      error: (error) => {
        this.inactiveReservations.set([]);
        console.error(error);
      },
    });
  }
}
