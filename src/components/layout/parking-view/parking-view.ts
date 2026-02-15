import { Component } from '@angular/core';
import { ParkingImage } from '../../ui/parking-image/parking-image';
import { ParkingSpotList } from '../parking-spot-list/parking-spot-list';
import { InfoCardContainer } from '../info-card-container/info-card-container';
import { AboutParkingContent } from '../../ui/about-parking-content/about-parking-content';
import { ParkingBenefitsContent } from '../../ui/parking-benefits-content/parking-benefits-content';
import { ParkingRatesContent } from '../../ui/parking-rates-content/parking-rates-content';

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
