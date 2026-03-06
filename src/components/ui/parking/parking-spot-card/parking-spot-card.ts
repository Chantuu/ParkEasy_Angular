import { ReservationService } from '../../../../services/reservation-service';
import { ParkingSpotStatusEnum } from '../../../../utilities/enums/parking-spot-status.enum';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-parking-spot-card',
  imports: [],
  templateUrl: './parking-spot-card.html',
  styleUrl: './parking-spot-card.css',
})
export class ParkingSpotCard {
  /**
   * Injected instance of ReservationService, used to create new reservations and manage reservations.
   */
  _reservationService = inject(ReservationService);

  /**
   * Reference to the ParkingSpotStatusEnum, used in the template to compare the parking spot status with enum values.
   */
  ParkingSpotStatusEnum = ParkingSpotStatusEnum;

  /**
   * Input containing the title of the parking spot (String).
   */
  parkingSpotTitle = input.required<string>();

  /**
   * Input containing the status of the parking spot (ParkingSpotStatusEnum).
   */
  parkingSpotStatus = input.required<ParkingSpotStatusEnum>();

  /**
   * Input containing the ID of the parking spot (String).
   */
  parkingSpotId = input.required<string>();

  /**
   * Method that returns the parking spot status as a capitalized string, used to display the status
   * in a more user-friendly format in the template.
   *
   * @returns Capitalized string representation of the parking spot status.
   */
  returnCapitalizedStatusText() {
    return (
      this.parkingSpotStatus().charAt(0).toUpperCase() +
      this.parkingSpotStatus().toLowerCase().slice(1)
    );
  }

  /**
   * Method that disables the reserve button if the parking spot status is either RESERVED or TAKEN, used to prevent users
   * from reserving a parking spot that is already reserved or taken.
   *
   * @returns Boolean indicating whether the reserve button should be disabled (true if status is RESERVED or TAKEN, false otherwise).
   */
  disableReserveButton() {
    return (
      this.parkingSpotStatus() === ParkingSpotStatusEnum.RESERVED ||
      this.parkingSpotStatus() === this.ParkingSpotStatusEnum.TAKEN
    );
  }

  /**
   * Method called when the user clicks the reserve button, which calls the createActiveReservation
   * function in ReservationService to create a new active reservation for desired the parking spot.
   */
  onClick() {
    this._reservationService.createActiveReservation(this.parkingSpotId()).subscribe({
      error(error) {
        console.log(error);
      },
    });
  }
}
