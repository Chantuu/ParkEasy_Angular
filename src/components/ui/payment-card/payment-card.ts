import { Component, input, output } from '@angular/core';
import { addSpaceInEveryFourLetter } from '../../../utilities/functions/add-space-in-every-four-letter.function';
import { getLastTwoDigits } from '../../../utilities/functions/get-last-two-digits.function';

@Component({
  selector: 'app-payment-card',
  imports: [],
  templateUrl: './payment-card.html',
  styleUrl: './payment-card.css',
})
export class PaymentCard {
  cardNumber = input.required<string>();
  cardHolderName = input.required<string>();
  expirationMonth = input.required<number>();
  expirationYear = input.required<number>();

  addSpaceInEveryFourLetter = addSpaceInEveryFourLetter;
  getLastTwoDigits = getLastTwoDigits;

  deletePaymentCard = output<void>();

  onClick() {
    this.deletePaymentCard.emit();
  }
}
