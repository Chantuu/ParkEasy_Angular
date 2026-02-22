import { Component, inject, OnInit, signal } from '@angular/core';
import { LogoutButton } from '../logout-button/logout-button';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { UserInterface } from '../../../utilities/interfaces/object-interfaces/user.interface';

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
  private _authService = inject(AuthService);
  private _router = inject(Router);

  currentUser = signal<UserInterface | null>(null);

  ngOnInit() {
    this._authService.checkAuth().subscribe({
      next: (response) => {
        this.currentUser.set(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

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
