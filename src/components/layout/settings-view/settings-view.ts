import { PaymentCardService } from './../../../services/payment-card-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PaymentCardForm } from '../../ui/payment-card-form/payment-card-form';
import { PaymentCard } from '../../ui/payment-card/payment-card';
import { PaymentCardInterface } from '../../../utilities/interfaces/payment-card.interface';
import { PaymentCardFormInterface } from '../../../utilities/interfaces/forms/payment-card-form.interface';

@Component({
  selector: 'app-settings-view',
  imports: [PaymentCardForm, PaymentCard],
  templateUrl: './settings-view.html',
  styleUrl: './settings-view.css',
  host: {
    class: 'globalContainerXMargin',
  },
})
export class SettingsView implements OnInit {
  _paymentCardService = inject(PaymentCardService);

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

  currentPaymentCard = signal<PaymentCardInterface | null>(null);

  onSubmit(formData: PaymentCardFormInterface) {
    this._paymentCardService.createPaymentCard(formData).subscribe({
      next: (response) => {
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
        this.currentPaymentCard.set(null);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
