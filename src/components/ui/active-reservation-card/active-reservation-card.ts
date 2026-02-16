import { Component, input } from '@angular/core';
import { returnFormattedDate } from '../../../utilities/functions/return-formatted-date.function';
import { returnFormattedTime } from '../../../utilities/functions/return-formatted-time.function';

@Component({
  selector: 'app-active-reservation-card',
  imports: [],
  templateUrl: './active-reservation-card.html',
  styleUrl: './active-reservation-card.css',
})
export class ActiveReservationCard {
  spotTitle = input.required<string>();
  dateText = input.required<string>();

  returnFormattedDate = returnFormattedDate;
  returnFormattedTime = returnFormattedTime;
}
