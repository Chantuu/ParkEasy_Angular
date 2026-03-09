import { Component, inject, OnInit, signal } from '@angular/core';
import { LogoutButton } from '../logout-button/logout-button';
import { AuthService } from '../../../../services/auth-service';
import { Router } from '@angular/router';
import { UserInterface } from '../../../../utilities/interfaces/object-interfaces/user.interface';

@Component({
  selector: 'app-top-bar',
  imports: [LogoutButton],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
  host: {
    class: 'globalContainerXMargin',
  },
})
export class TopBar implements OnInit {
  /**
   * Injected instance of AuthService, used to check user authentication status and perform logout actions.
   */
  private _authService = inject(AuthService);

  /**
   * Injected instance of Router, used to navigate between routes.
   */
  private _router = inject(Router);

  /**
   * Signal containing the current authenticated user data.
   */
  currentUser = signal<UserInterface | null>(null);

  /**
   * Lifecycle hook called on component initialization, which gets currently authenticated
   * user data from AuthService and updates the currentUser signal.
   */
  ngOnInit() {
    this._authService.checkAuth().subscribe({
      next: (response) => {
        // Set currently signed in user data to be visible in the template.
        this.currentUser.set(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * Method called when the user clicks the logout button, which calls the logout function in AuthService
   * to log out the user and navigates to the login page on successful logout.
   */
  onLogoutPress() {
    this._authService.logOutUser().subscribe({
      next: () => {
        this._router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
