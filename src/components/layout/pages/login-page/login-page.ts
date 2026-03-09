import { Component, inject } from '@angular/core';
import { Logo } from '../../../ui/logo/logo';
import { AuthWelcomeText } from '../../../ui/auth-welcome-text/auth-welcome-text';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inputValidityCheck } from '../../../../utilities/functions/input-validity-check.function';
import { passwordValidator } from '../../../../utilities/validators/password.validator';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { returnToastMessageObject } from '../../../../utilities/functions/return-toast-message-object.function';

@Component({
  selector: 'app-login-page',
  imports: [Logo, AuthWelcomeText, ReactiveFormsModule, RouterLink, ToastModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  /**
   * Injected instance of FormBuilder, used to create reactive form for login inputs.
   */
  private _messageService = inject(MessageService);

  /**
   * Injected instance of FormBuilder, used to create reactive form for login inputs.
   */
  private _formBuilder = inject(FormBuilder);

  /**
   * Injected instance of AuthService, used to call signInUser method for user authentication.
   */
  private _authService = inject(AuthService);

  /**
   * Injected instance of Router, used to navigate to home page on successful login.
   */
  private _router = inject(Router);

  /**
   * Utility function to check the validity of form inputs, used in the template for dynamic validation feedback.
   */
  inputValidityCheck = inputValidityCheck;

  /**
   * Reactive form group for login form, with email and password controls,
   * each having appropriate validators.
   */
  loginForm = this._formBuilder.group({
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
   * Method called on form submission. If form is valid, it calls signInUser
   *  method of AuthService and navigates to home page on success, or
   * shows an error toast on failure.
   */
  onSubmit() {
    const formData = this.loginForm.value;

    // Check if the form is valid before attempting to sign in the user
    if (!this.loginForm.invalid) {
      this._authService
        .signInUser({
          email: formData.email as string,
          password: formData.password as string,
        })
        .subscribe({
          // On successful login, navigate to the home page
          next: () => {
            this._router.navigate(['/home']);
          },
          // On login failure, show an error toast with the message
          error: (error: HttpErrorResponse) => {
            const savedError = error.error;

            this._messageService.add(
              returnToastMessageObject('error', 'Invalid Credentails', savedError.message),
            );
          },
        });
    }
  }
}
