import { Component, inject } from '@angular/core';
import { Logo } from '../../ui/logo/logo';
import { AuthWelcomeText } from '../../ui/auth-welcome-text/auth-welcome-text';
import { RouterLink } from '@angular/router';
import { inputValidityCheck } from '../../../utilities/functions/input-validity-check.function';
import {
  FormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { passwordValidator } from '../../../utilities/validators/password.validator';

@Component({
  selector: 'app-register-page',
  imports: [Logo, AuthWelcomeText, RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  /**
   * Property containing injected instance of FormBuilder class.
   */
  private _formBuilder = inject(FormBuilder);

  /**
   * Property containing inputValidityCheck function.
   */
  inputValidityCheck = inputValidityCheck;

  /**
   * Property containing reactive form representing current register form.
   */
  registerForm = this._formBuilder.group({
    name: this._formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: this._formBuilder.control('', { validators: [Validators.required, Validators.email] }),
    password: this._formBuilder.control('', {
      validators: [Validators.required, passwordValidator],
    }),
  });

  // TODO: Implement full submission functionality.
  onSubmit() {
    console.log(this.registerForm.value, this.registerForm.invalid);
  }
}
