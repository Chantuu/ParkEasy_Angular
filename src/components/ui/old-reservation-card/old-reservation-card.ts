import { Component, input } from '@angular/core';
import { ReservationEnum } from '../../../utilities/enums/reservation-status.enum';

@Component({
  selector: 'app-old-reservation-card',
  imports: [],
  templateUrl: './old-reservation-card.html',
  styleUrl: './old-reservation-card.css',
})
export class OldReservationCard {
  spotTitle = input.required<string>();
  dateText = input.required<string>();
  status = input.required<ReservationEnum>();
  amount = input.required<number>();

  ReservationEnum = ReservationEnum;

  returnFormattedDate() {
    return new Date(this.dateText()).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  }
}
