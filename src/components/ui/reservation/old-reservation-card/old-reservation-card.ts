import { Component, input } from '@angular/core';
import { ReservationEnum } from '../../../../utilities/enums/reservation-status.enum';
import { returnFormattedDate } from '../../../../utilities/functions/return-formatted-date.function';

@Component({
  selector: 'app-old-reservation-card',
  imports: [],
  templateUrl: './old-reservation-card.html',
  styleUrl: './old-reservation-card.css',
})
export class OldReservationCard {
  /**
   * Input containing the title of the parking spot (String).
   */
  spotTitle = input.required<string>();

  /**
   * Input containing the date of the reservation (String).
   */
  dateText = input.required<string>();

  /**
   * Input containing the status of the reservation (ReservationEnum).
   */
  status = input.required<ReservationEnum>();

  /**
   * Input containing the amount paid for the reservation (number).
   */
  amount = input.required<number>();

  /**
   * Reference to the ReservationEnum, used in the template to compare the reservation status
   * and display appropriate information based on whether the reservation was completed or cancelled.
   */
  ReservationEnum = ReservationEnum;

  /**
   * Reference to the returnFormattedDate utility function, used in the template
   * to format the reservation date in a user-friendly format.
   */
  returnFormattedDate = returnFormattedDate;
}
