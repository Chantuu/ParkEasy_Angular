import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { AuthResponseInterface } from '../utilities/interfaces/responses/auth-response.interface';
import { LoginRequestBodyInterface } from '../utilities/interfaces/request-bodies/login-request-body.interface';
import { RegisterRequestBodyInterface } from '../utilities/interfaces/request-bodies/register-request-body.interface';
import { CurrentUserResponseInterface } from '../utilities/interfaces/responses/current-user-response.interface';
import { UserLogoutResponse } from '../utilities/interfaces/responses/user-logout-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _apiService: ApiService) {}

  signInUser(requestBody: LoginRequestBodyInterface) {
    return this._apiService.sendPostRequest<LoginRequestBodyInterface, AuthResponseInterface>(
      'auth/login',
      requestBody,
    );
  }

  registerUser(requestBody: RegisterRequestBodyInterface) {
    return this._apiService.sendPostRequest<RegisterRequestBodyInterface, AuthResponseInterface>(
      'auth/register',
      requestBody,
    );
  }

  checkAuth() {
    return this._apiService.sendGetRequest<CurrentUserResponseInterface>('auth/currentUser');
  }

  logOutUser() {
    return this._apiService.sendGetRequest<UserLogoutResponse>('auth/logout');
  }
}
