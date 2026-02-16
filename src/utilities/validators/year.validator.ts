import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
