import { Routes } from '@angular/router';
import { LoginPage } from '../layout/pages/login-page/login-page';
import { RegisterPage } from '../layout/pages/register-page/register-page';
import { HomeScreenContainer } from '../layout/pages/home-screen-container/home-screen-container';
import { authGuard } from '../../guards/auth-guard';
import { ParkingView } from '../layout/views/parking-view/parking-view';
import { ReservationView } from '../layout/views/reservation-view/reservation-view';
import { SettingsView } from '../layout/views/settings-view/settings-view';

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
