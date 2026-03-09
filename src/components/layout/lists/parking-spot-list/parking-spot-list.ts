import { Component, inject, signal } from '@angular/core';
import { ParkingSpotCard } from '../../../ui/parking/parking-spot-card/parking-spot-card';
import { ParkingSpotStatusEnum } from '../../../../utilities/enums/parking-spot-status.enum';
import { Subscription } from 'rxjs';
import { ParkingSpotInterface } from '../../../../utilities/interfaces/object-interfaces/parking-spot.interface';
import { ParkingService } from '../../../../services/parking-service';

@Component({
  selector: 'app-parking-spot-list',
  imports: [ParkingSpotCard],
  templateUrl: './parking-spot-list.html',
  styleUrl: './parking-spot-list.css',
})
export class ParkingSpotList {
  /**
   * Injected instance of ParkingService, used to get parking spot data and subscribe to updates.
   */
  _parkingService = inject(ParkingService);

  /**
   * Subscription object, used to unsubscribe on component destruction to prevent memory leaks.
   */
  private _subscription!: Subscription;

  /**
   * Signal containing array of parking spots.
   */
  parkingSpots = signal<ParkingSpotInterface[]>([]);

  /**
   * Enum reference for parking spot status, used in the template to display status of each parking spot.
   */
  ParkingSpotStatus = ParkingSpotStatusEnum;

  /**
   * Lifecycle hook called on component initialization, which subscribes to the parking spot data stream
   * from ParkingService to receive real-time updates of parking spot information.
   */
  ngOnInit(): void {
    this._subscription = this._parkingService.streamParkingData().subscribe({
      // On receiving new parking spot data, update the parkingSpots signal with the received array of parking spots
      next: (data) => {
        this.parkingSpots.set(data);
      },
      error: (error) => {
        // On error, clear the parkingSpots signal and log the error to the console
        this.parkingSpots.set([]);
        console.error(error);
      },
    });
  }

  /**
   * Lifecycle hook called on component destruction, which unsubscribes from the parking spot data stream to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
