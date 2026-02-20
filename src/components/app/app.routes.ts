import { Routes } from '@angular/router';
import { LoginPage } from '../layout/login-page/login-page';
import { RegisterPage } from '../layout/register-page/register-page';
import { HomeScreenContainer } from '../layout/home-screen-container/home-screen-container';
import { authGuard } from '../../guards/auth-guard';
import { ParkingView } from '../layout/parking-view/parking-view';
import { ReservationView } from '../layout/reservation-view/reservation-view';
import { SettingsView } from '../layout/settings-view/settings-view';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
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
    children: [
      {
        path: '',
        redirectTo: '/home/parking',
        pathMatch: 'full',
      },
      {
        path: 'parking',
        component: ParkingView,
      },
      {
        path: 'reservation',
        component: ReservationView,
      },
      {
        path: 'settings',
        component: SettingsView,
      },
    ],
  },
];
