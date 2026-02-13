import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log(route.routeConfig?.path);

  if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register') {
    return authService.checkAuth().pipe(
      map(() => {
        router.navigate(['/home']);
        return false;
      }),
      catchError(() => {
        return of(true);
      }),
    );
  }

  return authService.checkAuth().pipe(
    map(() => {
      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    }),
  );
};
