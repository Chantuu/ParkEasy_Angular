import { Routes } from '@angular/router';
import { LoginPage } from '../layout/login-page/login-page';
import { RegisterPage } from '../layout/register-page/register-page';
import { HomeScreenContainer } from '../layout/home-screen-container/home-screen-container';
import { authGuard } from '../../guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: HomeScreenContainer,
    canActivate: [authGuard],
  },
];
