import { Component, signal } from '@angular/core';
import { PaymentCardForm } from '../../ui/payment-card-form/payment-card-form';
import { PaymentCard } from '../../ui/payment-card/payment-card';

@Component({
  selector: 'app-settings-view',
  imports: [PaymentCardForm, PaymentCard],
  templateUrl: './settings-view.html',
  styleUrl: './settings-view.css',
  host: {
    class: 'globalContainerXMargin',
  },
})
export class SettingsView {
  currentPaymentCard = signal<boolean>(true);
}
