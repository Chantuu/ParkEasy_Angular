import { Component, inject } from '@angular/core';
import { Logo } from '../../ui/logo/logo';
import { AuthWelcomeText } from '../../ui/auth-welcome-text/auth-welcome-text';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inputValidityCheck } from '../../../utilities/functions/input-validity-check.function';
import { passwordValidator } from '../../../utilities/validators/password.validator';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [Logo, AuthWelcomeText, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  /**
   * Property containing injected instance of FormBuilder class.
   */
  private _formBuilder = inject(FormBuilder);

  private _authService = inject(AuthService);

  private _router = inject(Router);

  /**
   * Property containing inputValidityCheck function.
   */
  inputValidityCheck = inputValidityCheck;

  /**
   * Property containing reactive form representing current login form.
   */
  loginForm = this._formBuilder.group({
    email: this._formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this._formBuilder.control('', {
      validators: [Validators.required, passwordValidator],
      nonNullable: true,
    }),
  });

  // TODO: Implement endpoint functionality
  onSubmit() {
    const formData = this.loginForm.value;

    if (!this.loginForm.invalid && formData.email && formData.password) {
      this._authService
        .signInUser({
          email: formData.email as string,
          password: formData.password as string,
        })
        .subscribe({
          next: (response) => {
            this._router.navigate(['/home']);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
