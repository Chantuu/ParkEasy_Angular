import { Component, output } from '@angular/core';

@Component({
  selector: 'button[logout]',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
  host: {
    '(click)': 'onClick()',
  },
})
export class LogoutButton {
  pressed = output<void>();

  onClick() {
    this.pressed.emit();
  }
}
