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
  _reservationService = inject(ReservationService);

  parkingSpotTitle = input.required<string>();
  parkingSpotStatus = input.required<ParkingSpotStatusEnum>();
  parkingSpotId = input.required<string>();

  ParkingSpotStatusEnum = ParkingSpotStatusEnum;

  returnCapitalizedStatusText() {
    return (
      this.parkingSpotStatus().charAt(0).toUpperCase() +
      this.parkingSpotStatus().toLowerCase().slice(1)
    );
  }

  disableReserveButton() {
    return (
      this.parkingSpotStatus() === ParkingSpotStatusEnum.RESERVED ||
      this.parkingSpotStatus() === this.ParkingSpotStatusEnum.TAKEN
    );
  }

  onClick() {
    this._reservationService.createActiveReservation(this.parkingSpotId()).subscribe({
      error(error) {
        console.log(error);
      },
    });
  }
}
