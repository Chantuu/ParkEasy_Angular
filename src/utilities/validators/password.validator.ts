import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * This validator is used to test password value in the input field. If it is at least
 * 8 characters long, has at least 1 uppercase, 1 lowercase and 1 symbol letters, it
 * passes validation, otherwise it fails validation.
 */
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const passwordValue = control.value;

  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasLowercase = /[a-z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
  const minLength = passwordValue.length >= 8;

  const passwordValid = hasUppercase && hasLowercase && hasNumber && hasSymbol && minLength;

  return !passwordValid ? { password: 'Current password is weak' } : null;
}
