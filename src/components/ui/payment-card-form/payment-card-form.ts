import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inputValidityCheck } from '../../../utilities/functions/input-validity-check.function';
import { creditCardValidator } from '../../../utilities/validators/credit-card.validator';
import { fourDigitYearValidator } from '../../../utilities/validators/year.validator';

@Component({
  selector: 'app-payment-card-form',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-card-form.html',
  styleUrl: './payment-card-form.css',
})
export class PaymentCardForm {
  private _formBuilder = inject(FormBuilder);

  inputValidityCheck = inputValidityCheck;

  paymentCardForm = this._formBuilder.group({
    cardNumber: this._formBuilder.control('', {
      validators: [Validators.required, creditCardValidator()],
      nonNullable: true,
    }),
    cardExpirationMonth: this._formBuilder.control('', {
      validators: [Validators.required, Validators.min(1), Validators.max(12)],
      nonNullable: true,
    }),
    cardExpirationYear: this._formBuilder.control('', {
      validators: [
        Validators.required,
        Validators.min(new Date().getFullYear()),
        fourDigitYearValidator(),
      ],
      nonNullable: true,
    }),
    ccv: this._formBuilder.control('', {
      validators: [Validators.required, Validators.min(100), Validators.max(999)],
      nonNullable: true,
    }),
    cardHolderName: this._formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });

  // TODO: Implement Payment Card Submission logic
  onSubmit() {
    console.log(this.paymentCardForm.value, this.paymentCardForm.invalid);
  }
}
