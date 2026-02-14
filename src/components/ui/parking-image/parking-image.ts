import { Component, input } from '@angular/core';

@Component({
  selector: 'app-parking-image',
  imports: [],
  templateUrl: './parking-image.html',
  styleUrl: './parking-image.css',
})
export class ParkingImage {
  imagePath = input.required<string>();
  imageAltText = input.required<string>();
  titleText = input.required<string>();
  infoTexts = input.required<string[]>();
}
