import { Component } from '@angular/core';
import { TopBar } from '../../ui/top-bar/top-bar';
import { NavBarLink } from '../../ui/nav-bar-link/nav-bar-link';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-screen-container',
  imports: [TopBar, NavBarLink, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './home-screen-container.html',
  styleUrl: './home-screen-container.css',
})
export class HomeScreenContainer {}
