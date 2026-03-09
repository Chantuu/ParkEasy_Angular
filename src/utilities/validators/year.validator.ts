import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * This is a factory function that creates a custom validator for four-digit year inputs. It checks if the input value
 * is a valid four-digit year by ensuring it consists of exactly four digits. If the input is valid, it returns null;
 * otherwise, it returns an object with a year property indicating that the validation failed.
 *
 * @returns A validator function that can be used with Angular forms to validate four-digit year inputs.
 */
export function fourDigitYearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // let required validator handle empty
    }

    const value = control.value.toString().trim();

    const isValid = /^\d{4}$/.test(value);

    return isValid ? null : { year: { valid: false } };
  };
}
