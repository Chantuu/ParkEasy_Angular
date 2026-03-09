import { PaymentCardService } from '../../../../services/payment-card-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PaymentCardForm } from '../../../ui/payment/payment-card-form/payment-card-form';
import { PaymentCard } from '../../../ui/payment/payment-card/payment-card';
import { PaymentCardExtendedInterface } from '../../../../utilities/interfaces/object-interfaces/payment-card-extended.interface';
import { PaymentCardFormInterface } from '../../../../utilities/interfaces/forms/payment-card-form.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { returnToastMessageObject } from '../../../../utilities/functions/return-toast-message-object.function';
import { AuthService } from '../../../../services/auth-service';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-view',
  imports: [PaymentCardForm, PaymentCard, ToastModule],
  templateUrl: './settings-view.html',
  styleUrl: './settings-view.css',
  host: {
    class: 'globalContainerXMargin',
  },
})
export class SettingsView implements OnInit {
  /**
   * Injected instance of PaymentCardService, used to fetch current payment card data
   * and perform create/delete operations on payment cards.
   */
  _paymentCardService = inject(PaymentCardService);

  /**
   * Injected instance of MessageService, used to show success toasts on payment card creation/deletion.
   */
  _messageService = inject(MessageService);

  _authService = inject(AuthService);

  _router = inject(Router);

  /**
   * Signal containing the current payment card data, which can be null if there is no payment card on file.
   */
  currentPaymentCard = signal<PaymentCardExtendedInterface | null>(null);

  /**
   * On component initialization, fetches the current payment card data
   * from the PaymentCardService and updates the currentPaymentCard signal.
   */
  ngOnInit(): void {
    this._paymentCardService.getCurrentPaymentCard().subscribe({
      // On successful response, updates the currentPaymentCard signal with the received payment card data.
      next: (response) => {
        this.currentPaymentCard.set(response.data);
      },
      // On error, sets the currentPaymentCard signal to null and logs the error to the console.
      error: (error) => {
        this.currentPaymentCard.set(null);
        console.error(error);
      },
    });
  }

  /**
   * Handler function for payment card form submission, called when the user submits the form to add a new payment card.
   *
   * @param formData - Object containing payment card information for creating new payment card.
   */
  onSubmit(formData: PaymentCardFormInterface) {
    this._paymentCardService.createPaymentCard(formData).subscribe({
      // On successful response, shows a success toast and updates the currentPaymentCard signal
      // with the newly created payment card data.
      next: (response) => {
        this._messageService.add(
          returnToastMessageObject(
            'success',
            'Payment Card Added',
            'Payment card was added successfully!',
          ),
        );
        this.currentPaymentCard.set(response.data);
      },
      // On error, logs the error to the console.
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * Handler function for deleting the current payment card, called when the user clicks the delete button on the payment card.
   */
  onDeletePaymentCard() {
    this._paymentCardService.deleteCurrentPaymentCard().subscribe({
      // On successful response, shows a success toast and sets the currentPaymentCard signal to null.
      next: () => {
        this._messageService.add(
          returnToastMessageObject(
            'success',
            'Payment Card Deleted',
            'Payment card was deleted successfully!',
          ),
        );
        this.currentPaymentCard.set(null);
      },
      // On error, logs the error to the console.
      error: (error) => {
        console.error(error);
      },
    });
  }

  onDeleteUser() {
    this._authService.deleteUser().subscribe({
      next: () => {
        this._messageService.add(
          returnToastMessageObject(
            'success',
            'User Deleted',
            'Your user account was deleted successfully!',
          ),
        );

        this._router.navigate(['/login']);
      },
      error: (error) => {
        const savedError = error.error;

        this._messageService.add(
          returnToastMessageObject('error', 'Error Deleting User', savedError.message),
        );
      },
    });
  }
}
