import { Component } from '@angular/core';
import { ParkingImage } from '../../../ui/parking/parking-image/parking-image';
import { ParkingSpotList } from '../../lists/parking-spot-list/parking-spot-list';
import { InfoCardContainer } from '../../info-card-container/info-card-container';
import { AboutParkingContent } from '../../../ui/parking/about-parking-content/about-parking-content';
import { ParkingBenefitsContent } from '../../../ui/parking/parking-benefits-content/parking-benefits-content';
import { ParkingRatesContent } from '../../../ui/parking/parking-rates-content/parking-rates-content';

@Component({
  selector: 'app-parking-view',
  imports: [
    ParkingImage,
    ParkingSpotList,
    InfoCardContainer,
    AboutParkingContent,
    ParkingBenefitsContent,
    ParkingRatesContent,
  ],
  templateUrl: './parking-view.html',
  styleUrl: './parking-view.css',
  host: {
    class: 'globalContainerXMargin',
  },
})
export class ParkingView {}
