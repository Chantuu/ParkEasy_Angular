import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

/**
 * AuthGuard that checks the user's authentication status before allowing access to all routes.
 * For the login and register routes, it checks if the user is already authenticated, otherwise
 * it checks if the user is authenticated for all other routes.
 *
 * @param route - The route being accessed, used to determine if it's a login/register route or another route.
 * @param state - The state of the router at the time of the attempted navigation, not used in this guard but required by the CanActivateFn signature.
 * @returns An Observable that emits a boolean indicating whether the route can be activated (true if access is allowed, false if access is denied).
 */
export const authGuard: CanActivateFn = (route, state) => {
  /**
   * Injected instance of AuthService, used to check and manage the user's authentication.
   */
  const authService = inject(AuthService);

  /**
   * Injected instance of Router, used to navigate to appropriate routes based on authentication status.
   */
  const router = inject(Router);

  // If the user is trying to access the login or register page, check if they are already authenticated.
  if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register') {
    return authService.checkAuth().pipe(
      // If the user is authenticated, navigate to the home page and prevent access to login/register pages.
      map(() => {
        router.navigate(['/home']);
        return false;
      }),
      // If there is an error (e.g., user is not authenticated), allow access to login/register pages.
      catchError(() => {
        return of(true);
      }),
    );
  }

  // For all other routes, check if the user is authenticated. If not, navigate to the login page.
  return authService.checkAuth().pipe(
    // If the user is authenticated, allow access to the requested route.
    map(() => {
      return true;
    }),
    // If there is an error (e.g., user is not authenticated), navigate to the login page and prevent access to the requested route.
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    }),
  );
};
