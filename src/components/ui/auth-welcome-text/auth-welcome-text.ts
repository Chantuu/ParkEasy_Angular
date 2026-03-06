import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-welcome-text',
  imports: [],
  templateUrl: './auth-welcome-text.html',
  styleUrl: './auth-welcome-text.css',
})
export class AuthWelcomeText {
  /**
   * Input containing header text of the welcome message (String).
   */
  headerText = input.required<string>();

  /**
   * Input containing paragraph text of the welcome message (String).
   */
  paragraphText = input.required<string>();
}
