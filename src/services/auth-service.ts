import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { LoginRequestBodyInterface } from '../utilities/interfaces/request-bodies/login-request-body.interface';
import { RegisterRequestBodyInterface } from '../utilities/interfaces/request-bodies/register-request-body.interface';
import { UserLogoutResponse } from '../utilities/interfaces/responses/user-logout-response.interface';
import { GenericResponseExtendedInterface } from '../utilities/interfaces/responses/generic-response-extended.interface';
import { UserInterface } from '../utilities/interfaces/object-interfaces/user.interface';
import { GenericResponseInterface } from '../utilities/interfaces/responses/generic-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _apiService: ApiService) {}

  signInUser(requestBody: LoginRequestBodyInterface) {
    return this._apiService.sendPostRequest<
      LoginRequestBodyInterface,
      GenericResponseExtendedInterface<UserInterface>
    >('auth/login', requestBody);
  }

  registerUser(requestBody: RegisterRequestBodyInterface) {
    return this._apiService.sendPostRequest<
      RegisterRequestBodyInterface,
      GenericResponseExtendedInterface<UserInterface>
    >('auth/register', requestBody);
  }

  checkAuth() {
    return this._apiService.sendGetRequest<GenericResponseInterface<UserInterface>>(
      'auth/currentUser',
    );
  }

  logOutUser() {
    return this._apiService.sendGetRequest<UserLogoutResponse>('auth/logout');
  }
}
