import { Component, inject } from '@angular/core';
import { Logo } from '../../../ui/logo/logo';
import { AuthWelcomeText } from '../../../ui/auth-welcome-text/auth-welcome-text';
import { Router, RouterLink } from '@angular/router';
import { inputValidityCheck } from '../../../../utilities/functions/input-validity-check.function';
import {
  FormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { passwordValidator } from '../../../../utilities/validators/password.validator';
import { AuthService } from '../../../../services/auth-service';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { returnToastMessageObject } from '../../../../utilities/functions/return-toast-message-object.function';

@Component({
  selector: 'app-register-page',
  imports: [
    Logo,
    AuthWelcomeText,
    RouterLink,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  /**
   * Injected instance of FormBuilder, used to create reactive form for registration inputs.
   */
  private _formBuilder = inject(FormBuilder);

  /**
   * Injected instance of AuthService, used to call registerUser method for user registration.
   */
  private _authService = inject(AuthService);

  /**
   * Injected instance of Router, used to navigate to home page on successful registration.
   */
  private _router = inject(Router);

  /**
   * Injected instance of MessageService, used to show error toast on registration failure.
   */
  private _messageService = inject(MessageService);

  /**
   * Utility function to check the validity of form inputs, used in the template for dynamic validation feedback.
   */
  inputValidityCheck = inputValidityCheck;

  /**
   * Reactive form group for registration form, with name, email and password controls, each having appropriate validators.
   */
  registerForm = this._formBuilder.group({
    name: this._formBuilder.control('', {
      // Validators for name field: required and must be at least 3 characters long
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: this._formBuilder.control('', {
      // Validators for email field: required and must be a valid email format
      validators: [Validators.required, Validators.email],
    }),
    password: this._formBuilder.control('', {
      // Validators for password field: required and must satisfy custom password rules
      validators: [Validators.required, passwordValidator],
    }),
  });

  /**
   * /**
   * Method called on form submission. If form is valid, it calls registerUser
   *  method of AuthService and navigates to home page on success, or
   * shows an error toast on failure.
   */
  onSubmit() {
    const formData = this.registerForm.value;

    // Check if the form is valid before attempting to register the user
    if (!this.registerForm.invalid) {
      this._authService
        .registerUser({
          fullName: formData.name as string,
          email: formData.email as string,
          password: formData.password as string,
        })
        .subscribe({
          // On successful registration, navigate to the home page
          next: () => {
            this._router.navigate(['/home']);
          },
          // On registration failure, show an error toast with the message
          error: (error: HttpErrorResponse) => {
            const savedError = error.error;

            this._messageService.add(
              returnToastMessageObject('error', 'Invalid Credentials', savedError.message),
            );
          },
        });
    }
  }
}
