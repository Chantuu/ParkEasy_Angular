import { PaymentCardService } from '../../../../services/payment-card-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PaymentCardForm } from '../../../ui/payment/payment-card-form/payment-card-form';
import { PaymentCard } from '../../../ui/payment/payment-card/payment-card';
import { PaymentCardExtendedInterface } from '../../../../utilities/interfaces/object-interfaces/payment-card-extended.interface';
import { PaymentCardFormInterface } from '../../../../utilities/interfaces/forms/payment-card-form.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { returnToastMessageObject } from '../../../../utilities/functions/return-toast-message-object.function';

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
  _paymentCardService = inject(PaymentCardService);
  _messageService = inject(MessageService);

  ngOnInit(): void {
    this._paymentCardService.getCurrentPaymentCard().subscribe({
      next: (response) => {
        this.currentPaymentCard.set(response.data);
      },
      error: (error) => {
        this.currentPaymentCard.set(null);
        console.error(error);
      },
    });
  }

  currentPaymentCard = signal<PaymentCardExtendedInterface | null>(null);

  onSubmit(formData: PaymentCardFormInterface) {
    this._paymentCardService.createPaymentCard(formData).subscribe({
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
      error: (error) => {
        console.error(error);
      },
    });
  }

  onDeletePaymentCard() {
    this._paymentCardService.deleteCurrentPaymentCard().subscribe({
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
      error: (error) => {
        console.error(error);
      },
    });
  }
}
