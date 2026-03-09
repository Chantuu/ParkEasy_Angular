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
  /**
   * Injected instance of PaymentService, used to call payment related methods for reservation actions.
   */
  _paymentService = inject(PaymentService);

  /**
   * Injected instance of Router, used to navigate routes.
   */
  _router = inject(Router);

  /**
   * Injected instance of MessageService, used to show success/error toasts on user actions.
   */
  _messageService = inject(MessageService);

  /**
   * Injected instance of ReservationService, used to get and manage reservation data.
   */
  _reservationService = inject(ReservationService);

  /**
   * Input containing the title of the parking spot (String).
   */
  spotTitle = input.required<string>();

  /**
   * Input containing the date of the reservation (String).
   */
  dateText = input.required<string>();

  /**
   * Reference to the returnFormattedDate utility function, used in the template
   * to format the reservation date in a user-friendly format.
   */
  returnFormattedDate = returnFormattedDate;

  /**
   * Reference to the returnFormattedTime utility function, used in the template
   * to format the reservation time in a user-friendly format.
   */
  returnFormattedTime = returnFormattedTime;

  /**
   * Method called when the user clicks the cancel button on the active reservation card,
   * which calls the payCancelled method of PaymentService to cancel the reservation and
   * shows a success or error toast based on the response.
   */
  cancelButtonClicked() {
    this._paymentService.payCancelled().subscribe({
      next: () => {
        this._messageService.add(
          // Show a success toast message on successful cancellation of the reservation.
          returnToastMessageObject(
            'success',
            'Transaction Successfull',
            'Sucessfully cancelled reservation!',
          ),
        );

        // Trigger a refresh of the reservation data in ReservationService to update the UI.
        this._reservationService.triggerRefresh();
      },
      error: (error: HttpErrorResponse) => {
        const savedError = error.error;

        // Show an error toast message on failure to cancel the reservation, with the error message from the response.
        this._messageService.add(
          returnToastMessageObject('error', 'Transaction Unsuccessfull', savedError.message),
        );
      },
    });
  }

  /**
   * Method called when the user clicks the check-in button on the active reservation card,
   * which first calculates the reservation price using calculateReservationPrice method of PaymentService,
   * then calls the payCompleted method to complete the payment and check-in the reservation,
   * showing success or error toasts based on the responses.
   */
  checkInButtonClicked() {
    // First, calculate the reservation price before attempting to check-in.
    this._paymentService.calculateReservationPrice().subscribe({
      next: (response) => {
        // On successful price calculation, proceed to complete the payment and check-in the reservation.
        this._paymentService.payCompleted(response.data.amountToPay).subscribe({
          next: () => {
            // Show a success toast message on successful check-in of the reservation.
            this._messageService.add(
              returnToastMessageObject(
                'success',
                'Transaction Successfull',
                'Sucessfully checked in reservation!',
              ),
            );

            // Trigger a refresh of the reservation data in ReservationService to update the UI after check-in.
            this._reservationService.triggerRefresh();
          },
          error: (error) => {
            const savedError = error.error;

            // Show an error toast message on failure to check-in the reservation, with the error message from the response.
            this._messageService.add(
              returnToastMessageObject('error', 'Transaction Unsuccessfull', savedError.message),
            );
          },
        });
      },
      // On error during price calculation, log an error with the error message from the response.
      error: (error) => {
        console.error(error);
      },
    });
  }
}
