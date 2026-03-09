import { Routes } from '@angular/router';
import { LoginPage } from '../layout/pages/login-page/login-page';
import { RegisterPage } from '../layout/pages/register-page/register-page';
import { HomeScreenContainer } from '../layout/pages/home-screen-container/home-screen-container';
import { authGuard } from '../../guards/auth-guard';
import { ParkingView } from '../layout/views/parking-view/parking-view';
import { ReservationView } from '../layout/views/reservation-view/reservation-view';
import { SettingsView } from '../layout/views/settings-view/settings-view';

export const routes: Routes = [
  /* Redirect to login page if the path is empty */
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  /* Login and Register routes, protected by authGuard to prevent access when already authenticated */
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
  /* Home route with child routes, protected by authGuard to ensure only authenticated users can access */
  {
    path: 'home',
    component: HomeScreenContainer,
    canActivate: [authGuard],
    children: [
      /* Default child route redirects to parking view */
      {
        path: '',
        redirectTo: '/home/parking',
        pathMatch: 'full',
      },
      /* Child routes for parking, reservation, and settings views */
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
