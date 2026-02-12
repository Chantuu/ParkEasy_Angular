import { Routes } from '@angular/router';
import { LoginPage } from '../layout/login-page/login-page';
import { RegisterPage } from '../layout/register-page/register-page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
];
