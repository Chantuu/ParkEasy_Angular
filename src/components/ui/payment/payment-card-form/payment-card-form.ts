import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inputValidityCheck } from '../../../../utilities/functions/input-validity-check.function';
import { creditCardValidator } from '../../../../utilities/validators/credit-card.validator';
import { fourDigitYearValidator } from '../../../../utilities/validators/year.validator';
import { PaymentCardFormInterface } from '../../../../utilities/interfaces/forms/payment-card-form.interface';

@Component({
  selector: 'app-payment-card-form',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-card-form.html',
  styleUrl: './payment-card-form.css',
})
export class PaymentCardForm {
  /**
   * Private property containing an instance of FormBuilder, used to create the payment card form group and controls.
   */
  private _formBuilder = inject(FormBuilder);

  /**
   * Property referencing the inputValidityCheck function, used in the template to check
   * the validity of form inputs and provide dynamic validation feedback.
   */
  inputValidityCheck = inputValidityCheck;

  /**
   * Output event emitter that emits the form data when the payment card form is submitted and valid,
   * used to trigger payment card creation in the parent component.
   */
  formSubmitted = output<PaymentCardFormInterface>();

  /**
   * Reactive form group for payment card form, with controls for card number, expiration month/year, CCV and card holder name.
   */
  paymentCardForm = this._formBuilder.group({
    cardNumber: this._formBuilder.control('', {
      // Validators for card number field: required and must satisfy custom credit card validation rules.
      validators: [Validators.required, creditCardValidator()],
      nonNullable: true,
    }),
    cardExpirationMonth: this._formBuilder.control('', {
      // Validators for card expiration month field: required and must be a number between 1 and 12.
      validators: [Validators.required, Validators.min(1), Validators.max(12)],
      nonNullable: true,
    }),
    cardExpirationYear: this._formBuilder.control('', {
      // Validators for card expiration year field: required, must be a number greater than or equal to the current year,
      // and must satisfy custom four digit year validation rules.
      validators: [
        Validators.required,
        Validators.min(new Date().getFullYear()),
        fourDigitYearValidator(),
      ],
      nonNullable: true,
    }),
    ccv: this._formBuilder.control('', {
      // Validators for CCV field: required and must be a number between 100 and 999 (3 digits).
      validators: [Validators.required, Validators.min(100), Validators.max(999)],
      nonNullable: true,
    }),
    cardHolderName: this._formBuilder.control('', {
      // Validators for card holder name field: required and must be at least 3 characters long.
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });

  onSubmit() {
    // Get the raw form data from the paymentCardForm form group.
    const formData = this.paymentCardForm.value;

    // Transform the expiration month/year and CCV from string to number, since form controls return values as strings.
    const transformedCardExpirationMonth = parseInt(formData.cardExpirationMonth as string);
    const transformedCardExpirationYear = parseInt(formData.cardExpirationYear as string);
    const transformedCcv = parseInt(formData.ccv as string);

    // Check if the form is valid before emitting the form data to the parent component.
    if (!this.paymentCardForm.invalid) {
      this.formSubmitted.emit({
        cardNumber: formData.cardNumber as string,
        cardExpirationMonth: transformedCardExpirationMonth,
        cardExpirationYear: transformedCardExpirationYear,
        cardHolderName: formData.cardHolderName as string,
        ccv: transformedCcv,
      });
    }
  }
}
