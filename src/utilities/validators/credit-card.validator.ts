import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * This is factory function that creates a custom validator for credit card numbers. It checks if the input value is
 * a valid credit card number using the Luhn algorithm. The validator allows for spaces and dashes in the input,
 * but ultimately validates only the digits. If the input is valid, it returns null; otherwise, it returns an
 * object with a creditCard property indicating that the validation failed.
 *
 * @returns A validator function that can be used with Angular forms.
 */
export function creditCardValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // let required validator handle empty case
    }

    const value: string = control.value.replace(/\s+/g, '').replace(/-/g, '');

    // Only digits allowed
    if (!/^\d+$/.test(value)) {
      return { creditCard: { valid: false } };
    }

    // Luhn Algorithm
    let sum = 0;
    let shouldDouble = false;

    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    const isValid = sum % 10 === 0;

    return isValid ? null : { creditCard: { valid: false } };
  };
}
