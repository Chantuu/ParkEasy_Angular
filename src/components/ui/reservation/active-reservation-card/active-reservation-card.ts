import { Component, inject, input } from '@angular/core';
import { returnFormattedDate } from '../../../../utilities/functions/return-formatted-date.function';
import { returnFormattedTime } from '../../../../utilities/functions/return-formatted-time.function';
import { PaymentService } from '../../../../services/payment-service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { returnToastMessageObject } from '../../../../utilities/functions/return-toast-message-object.function';
import { ReservationService } from '../../../../services/reservation-service';

@Component({
  selector: 'app-active-reservation-card',
  imports: [ToastModule],
  templateUrl: './active-reservation-card.html',
  styleUrl: './active-reservation-card.css',
})
export class ActiveReservationCard {
  _paymentService = inject(PaymentService);
  _router = inject(Router);
  _messageService = inject(MessageService);
  _reservationService = inject(ReservationService);

  spotTitle = input.required<string>();
  dateText = input.required<string>();

  returnFormattedDate = returnFormattedDate;
  returnFormattedTime = returnFormattedTime;

  cancelButtonClicked() {
    this._paymentService.payCancelled().subscribe({
      next: () => {
        this._messageService.add(
          returnToastMessageObject(
            'success',
            'Transaction Successfull',
            'Sucessfully cancelled reservation!',
          ),
        );

        this._reservationService.triggerRefresh();
      },
      error: (error: HttpErrorResponse) => {
        const savedError = error.error;

        this._messageService.add(
          returnToastMessageObject('error', 'Transaction Unsuccessfull', savedError.message),
        );
      },
    });
  }

  checkInButtonClicked() {
    this._paymentService.calculateReservationPrice().subscribe({
      next: (response) => {
        this._paymentService.payCompleted(response.data.amountToPay).subscribe({
          next: () => {
            this._messageService.add(
              returnToastMessageObject(
                'success',
                'Transaction Successfull',
                'Sucessfully checked in reservation!',
              ),
            );

            this._reservationService.triggerRefresh();
          },
          error: (error) => {
            const savedError = error.error;

            this._messageService.add(
              returnToastMessageObject('error', 'Transaction Unsuccessfull', savedError.message),
            );
          },
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
