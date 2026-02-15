import { Component, signal } from '@angular/core';
import { OldReservationCardList } from '../old-reservation-card-list/old-reservation-card-list';
import { ActiveReservationCard } from '../../ui/active-reservation-card/active-reservation-card';
import { ReservationInterface } from '../../../utilities/interfaces/reservation.interface';

@Component({
  selector: 'app-reservation-view',
  imports: [OldReservationCardList, ActiveReservationCard],
  templateUrl: './reservation-view.html',
  styleUrl: './reservation-view.css',
  host: {
    class: 'globalContainerXMargin',
  },
})
export class ReservationView {
  activeReservationData = signal<ReservationInterface | null>(null);

  // TODO: Create Proper Reservation Retrieval
}
