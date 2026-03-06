import { Component, input } from '@angular/core';

@Component({
  selector: 'app-parking-image',
  imports: [],
  templateUrl: './parking-image.html',
  styleUrl: './parking-image.css',
})
export class ParkingImage {
  /**
   * Input containing the path to the parking image (String).
   */
  imagePath = input.required<string>();

  /**
   * Input containing the alt text for the parking image (String).
   */
  imageAltText = input.required<string>();

  /**
   * Input containing the title text for the parking image (String).
   */
  titleText = input.required<string>();

  /**
   * Input containing an array of info texts related to the parking image (String[]).
   */
  infoTexts = input.required<string[]>();
}
