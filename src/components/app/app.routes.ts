import { Routes } from '@angular/router';
import { LoginPage } from '../layout/login-page/login-page';
import { RegisterPage } from '../layout/register-page/register-page';
import { HomeScreenContainer } from '../layout/home-screen-container/home-screen-container';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'home',
    component: HomeScreenContainer,
  },
];
