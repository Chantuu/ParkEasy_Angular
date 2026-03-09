import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { LoginRequestBodyInterface } from '../utilities/interfaces/request-bodies/login-request-body.interface';
import { RegisterRequestBodyInterface } from '../utilities/interfaces/request-bodies/register-request-body.interface';
import { GenericMessageResponse } from '../utilities/interfaces/responses/generic-message-response.interface';
import { GenericResponseExtendedInterface } from '../utilities/interfaces/responses/generic-response-extended.interface';
import { UserInterface } from '../utilities/interfaces/object-interfaces/user.interface';
import { GenericResponseInterface } from '../utilities/interfaces/responses/generic-response.interface';

@Injectable({
  providedIn: 'root',
})
/**
 * Service responsible for handling all authentication-related operations, such as signing in, registering,
 * checking authentication status, and logging out. It uses the ApiService to make HTTP requests to the backend API
 * for these operations, providing a clean and centralized interface for authentication functionality across the application.
 */
export class AuthService {
  /**
   * Constructor for the ApiService used for injection.
   *
   * @param _apiService - The ApiService for making HTTP requests to the backend API.
   */
  constructor(private _apiService: ApiService) {}

  /**
   * Method for signing in a user. It takes a request body containing the user's login credentials
   * and sends a POST request to the backend API.
   *
   * @param requestBody - An object containing the user's login credentials, typed as LoginRequestBodyInterface.
   * @returns An Observable that emits the response from the API, which includes user data if the login is successful.
   */
  signInUser(requestBody: LoginRequestBodyInterface) {
    return this._apiService.sendPostRequest<
      LoginRequestBodyInterface,
      GenericResponseExtendedInterface<UserInterface>
    >('auth/login', requestBody);
  }

  /**
   * Method for registering a new user. It takes a request body containing the user's registration information
   * and sends a POST request to the backend API.
   *
   * @param requestBody - An object containing the user's registration information, typed as RegisterRequestBodyInterface.
   * @returns An Observable that emits the response from the API, which includes user data if the registration is successful.
   */
  registerUser(requestBody: RegisterRequestBodyInterface) {
    return this._apiService.sendPostRequest<
      RegisterRequestBodyInterface,
      GenericResponseExtendedInterface<UserInterface>
    >('auth/register', requestBody);
  }

  /**
   * Method for checking the user's authentication status. It sends a GET request to the backend API t
   * o check if the user is currently authenticated.
   *
   * @returns An Observable that emits the response from the API, which includes user data if the user is authenticated.
   */
  checkAuth() {
    return this._apiService.sendGetRequest<GenericResponseInterface<UserInterface>>(
      'auth/currentUser',
    );
  }

  /**
   * Method for logging out the user. It sends a GET request to the backend API to log out the current user.
   *
   * @returns An Observable that emits the response from the API, which indicates whether the logout was successful.
   */
  logOutUser() {
    return this._apiService.sendGetRequest<GenericMessageResponse>('auth/logout');
  }

  /**
   * Method for deleting user. It sens a DELETE request to the backend API to delete current user.
   *
   * @returns An Observable that emits the response from the API, which indicates whether user deletion was successful.
   */
  deleteUser() {
    return this._apiService.sendDeleteRequest<GenericMessageResponse>('auth/delete');
  }
}
