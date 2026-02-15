import { Component } from '@angular/core';
import { ParkingSpotCard } from '../../ui/parking-spot-card/parking-spot-card';
import { ParkingSpotStatusEnum } from '../../../utilities/enums/parking-spot-status.enum';

@Component({
  selector: 'app-parking-spot-list',
  imports: [ParkingSpotCard],
  templateUrl: './parking-spot-list.html',
  styleUrl: './parking-spot-list.css',
})
export class ParkingSpotList {
  ParkingSpotStatus = ParkingSpotStatusEnum;
}
