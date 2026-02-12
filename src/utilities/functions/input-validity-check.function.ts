import { FormControl } from '@angular/forms';

/**
 * This helper function is used to control input field error message visibility by checking, if
 * data in the specified input field is invalid and was interacted by the user.
 * It will return true, if data in that input field is invalid, otherwise false.
 *
 * @param formControl - Desired form input field to check
 * @returns Boolean
 */
export function inputValidityCheck(formControl: FormControl<string | null>): boolean {
  // Check if, input field is invalid and it was interacted by the user
  return formControl?.invalid && (formControl?.touched || formControl?.dirty);
}
