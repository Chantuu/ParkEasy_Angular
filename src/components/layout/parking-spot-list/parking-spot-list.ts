import { Component, inject, signal } from '@angular/core';
import { ParkingSpotCard } from '../../ui/parking-spot-card/parking-spot-card';
import { ParkingSpotStatusEnum } from '../../../utilities/enums/parking-spot-status.enum';
import { Subscription } from 'rxjs';
import { ParkingSpotInterface } from '../../../utilities/interfaces/object-interfaces/parking-spot.interface';
import { ParkingService } from '../../../services/parking-service';

@Component({
  selector: 'app-parking-spot-list',
  imports: [ParkingSpotCard],
  templateUrl: './parking-spot-list.html',
  styleUrl: './parking-spot-list.css',
})
export class ParkingSpotList {
  _parkingService = inject(ParkingService);
  private _subscription!: Subscription;

  parkingSpots = signal<ParkingSpotInterface[]>([]);

  ParkingSpotStatus = ParkingSpotStatusEnum;

  ngOnInit(): void {
    this._subscription = this._parkingService.streamParkingData().subscribe({
      next: (data) => {
        this.parkingSpots.set(data);
      },
      error: (error) => {
        this.parkingSpots.set([]);
        console.error(error);
      },
    });
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
