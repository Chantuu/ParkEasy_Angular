import { Component, inject } from '@angular/core';
import { Logo } from '../../ui/logo/logo';
import { AuthWelcomeText } from '../../ui/auth-welcome-text/auth-welcome-text';
import { Router, RouterLink } from '@angular/router';
import { inputValidityCheck } from '../../../utilities/functions/input-validity-check.function';
import {
  FormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { passwordValidator } from '../../../utilities/validators/password.validator';
import { AuthService } from '../../../services/auth-service';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { returnToastMessageObject } from '../../../utilities/functions/return-toast-message-object.function';

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
   * Property containing injected instance of FormBuilder class.
   */
  private _formBuilder = inject(FormBuilder);

  private _authService = inject(AuthService);

  private _router = inject(Router);

  private _messageService = inject(MessageService);

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

  onSubmit() {
    const formData = this.registerForm.value;

    if (!this.registerForm.invalid) {
      this._authService
        .registerUser({
          fullName: formData.name as string,
          email: formData.email as string,
          password: formData.password as string,
        })
        .subscribe({
          next: () => {
            this._router.navigate(['/home']);
          },
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
