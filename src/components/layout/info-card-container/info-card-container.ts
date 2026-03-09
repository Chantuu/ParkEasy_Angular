import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-card-container',
  imports: [],
  templateUrl: './info-card-container.html',
  styleUrl: './info-card-container.css',
})
export class InfoCardContainer {
  /**
   * Input containing title of the info card (String).
   */
  title = input.required<string>();
}
