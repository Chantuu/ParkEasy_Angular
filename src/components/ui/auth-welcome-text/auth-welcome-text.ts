import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-welcome-text',
  imports: [],
  templateUrl: './auth-welcome-text.html',
  styleUrl: './auth-welcome-text.css',
})
export class AuthWelcomeText {
  headerText = input.required<string>();
  paragraphText = input.required<string>();
}
