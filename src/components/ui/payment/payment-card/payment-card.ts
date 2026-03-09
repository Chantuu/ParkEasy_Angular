import { Component, input, output } from '@angular/core';
import { addSpaceInEveryFourLetter } from '../../../../utilities/functions/add-space-in-every-four-letter.function';
import { getLastTwoDigits } from '../../../../utilities/functions/get-last-two-digits.function';

@Component({
  selector: 'app-payment-card',
  imports: [],
  templateUrl: './payment-card.html',
  styleUrl: './payment-card.css',
})
export class PaymentCard {
  /**
   * Input containing the card number (String).
   */
  cardNumber = input.required<string>();

  /**
   * Input containing the card holder's name (String).
   */
  cardHolderName = input.required<string>();

  /**
   * Input containing the card's expiration month (Number).
   */
  expirationMonth = input.required<number>();

  /**
   * Input containing the card's expiration year (Number).
   */
  expirationYear = input.required<number>();

  /**
   * Property referencing the addSpaceInEveryFourLetter function, used to format the card number in the template.
   */
  addSpaceInEveryFourLetter = addSpaceInEveryFourLetter;

  /**
   * Property referencing the getLastTwoDigits function, used to get the last two digits of the expiration year in the template.
   */
  getLastTwoDigits = getLastTwoDigits;

  /**
   * Output event emitter that emits when the user clicks the delete button on the payment card,
   *  used to trigger deletion of the card in the parent component.
   */
  deletePaymentCard = output<void>();

  /**
   * Method called when the user clicks the delete button on the payment card, which emits the deletePaymentCard event.
   */
  onClick() {
    this.deletePaymentCard.emit();
  }
}
