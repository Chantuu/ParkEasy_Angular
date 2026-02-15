import { ParkingSpotStatusEnum } from './../../../utilities/enums/parking-spot-status.enum';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-parking-spot-card',
  imports: [],
  templateUrl: './parking-spot-card.html',
  styleUrl: './parking-spot-card.css',
})
export class ParkingSpotCard {
  parkingSpotTitle = input.required<string>();
  parkingSpotStatus = input.required<ParkingSpotStatusEnum>();

  ParkingSpotStatusEnum = ParkingSpotStatusEnum;

  returnCapitalizedStatusText() {
    return (
      this.parkingSpotStatus().charAt(0).toUpperCase() +
      this.parkingSpotStatus().toLowerCase().slice(1)
    );
  }
}
