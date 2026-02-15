import { Component, signal } from '@angular/core';
import { OldReservationCard } from '../../ui/old-reservation-card/old-reservation-card';
import { ReservationEnum } from '../../../utilities/enums/reservation-status.enum';
import { ReservationInterface } from '../../../utilities/interfaces/reservation.interface';

@Component({
  selector: 'app-old-reservation-card-list',
  imports: [OldReservationCard],
  templateUrl: './old-reservation-card-list.html',
  styleUrl: './old-reservation-card-list.css',
})
export class OldReservationCardList {
  oldReservations = signal<ReservationInterface[]>([]);

  // TODO: Implement proper Reservation Retrieval functionality
}
