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
  /**
   * Output event emitter that emits when the logout button is pressed,
   * allowing parent components to handle the logout action.
   */
  pressed = output<void>();

  /**
   * Function form emmiting pressed event when the logout button is clicked.
   */
  onClick() {
    this.pressed.emit();
  }
}
