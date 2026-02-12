import { Component, inject } from '@angular/core';
import { Logo } from '../../ui/logo/logo';
import { AuthWelcomeText } from '../../ui/auth-welcome-text/auth-welcome-text';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inputValidityCheck } from '../../../utilities/functions/input-validity-check.function';
import { passwordValidator } from '../../../utilities/validators/password.validator';

@Component({
  selector: 'app-login-page',
  imports: [Logo, AuthWelcomeText, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  /**
   * Property containing injected instance of FormBuilder class.
   */
  private _formBuilder = inject(FormBuilder);

  /**
   * Property containing inputValidityCheck function.
   */
  inputValidityCheck = inputValidityCheck;

  /**
   * Property containing reactive form representing current login form.
   */
  loginForm = this._formBuilder.group({
    email: this._formBuilder.control('', { validators: [Validators.required, Validators.email] }),
    password: this._formBuilder.control('', {
      validators: [Validators.required, passwordValidator],
    }),
  });

  // TODO: Implement endpoint functionality
  onSubmit() {
    console.log(this.loginForm.value, this.loginForm.invalid);
  }
}
