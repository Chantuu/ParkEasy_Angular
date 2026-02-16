import { Component, inject, input } from '@angular/core';
import { returnFormattedDate } from '../../../utilities/functions/return-formatted-date.function';
import { returnFormattedTime } from '../../../utilities/functions/return-formatted-time.function';
import { PaymentService } from '../../../services/payment-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-reservation-card',
  imports: [],
  templateUrl: './active-reservation-card.html',
  styleUrl: './active-reservation-card.css',
})
export class ActiveReservationCard {
  _paymentService = inject(PaymentService);
  _router = inject(Router);

  spotTitle = input.required<string>();
  dateText = input.required<string>();

  returnFormattedDate = returnFormattedDate;
  returnFormattedTime = returnFormattedTime;

  cancelButtonClicked() {
    this._paymentService.payCancelled().subscribe({
      next: () => {
        this.softReloadCurrentRoute();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  checkInButtonClicked() {
    this._paymentService.calculateReservationPrice().subscribe({
      next: (response) => {
        this._paymentService.payCompleted(response.data.amountToPay).subscribe({
          next: () => {
            this.softReloadCurrentRoute();
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private softReloadCurrentRoute() {
    const currentUrl = this._router.url;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }
}
