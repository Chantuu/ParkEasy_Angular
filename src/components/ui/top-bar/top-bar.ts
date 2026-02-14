import { Component, inject } from '@angular/core';
import { LogoutButton } from '../logout-button/logout-button';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [LogoutButton],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
  host: {
    class: 'globalContainerXMargin',
  },
})
export class TopBar {
  private _authService = inject(AuthService);
  private _router = inject(Router);

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
