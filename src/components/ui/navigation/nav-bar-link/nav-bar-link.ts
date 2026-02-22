import { Component, input } from '@angular/core';

@Component({
  selector: 'a[navbar-link]',
  imports: [],
  templateUrl: './nav-bar-link.html',
  styleUrl: './nav-bar-link.css',
})
export class NavBarLink {
  iconPath = input.required<string>();
}
