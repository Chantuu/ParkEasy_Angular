import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { PaymentCardResponseInterface } from '../utilities/interfaces/responses/payment-card-response.interface';
import { PaymentCardFormInterface } from '../utilities/interfaces/forms/payment-card-form.interface';
import { GenericResponseInterface } from '../utilities/interfaces/responses/generic-response.interface';
import { PaymentCardInterface } from '../utilities/interfaces/object-interfaces/payment-card.interface';

@Injectable({
  providedIn: 'root',
})
/**
 * Service responsible for handling all payment card-related operations, such as fetching the current payment card,
 * creating a new payment card, and deleting the current payment card.
 */
export class PaymentCardService {
  /**
   * Constructor for the ApiService used for injection.
   *
   * @param _apiService - The ApiService for making HTTP requests to the backend API.
   */
  constructor(private _apiService: ApiService) {}

  /**
   * Method for fetching the current payment card data from the backend API. It sends a GET request to the appropriate endpoint.
   *
   * @returns An Observable that emits the response from the API, which includes payment card data if the request is successful.
   */
  getCurrentPaymentCard() {
    return this._apiService.sendGetRequest<PaymentCardResponseInterface>('payments/paymentCard');
  }

  /**
   * Method for creating a new payment card. It takes an object containing payment card information,
   * sends a POST request to the backend API, and returns the response.
   *
   * @param paymentCardData - An object containing payment card information for creating a new payment card, typed as PaymentCardFormInterface.
   * @returns An Observable that emits the response from the API, which includes the created payment card data if the request is successful.
   */
  createPaymentCard(paymentCardData: PaymentCardFormInterface) {
    return this._apiService.sendPostRequest<PaymentCardFormInterface, PaymentCardResponseInterface>(
      'payments/paymentCard',
      paymentCardData,
    );
  }

  /**
   * Method for deleting the current payment card. It sends a DELETE request to the appropriate endpoint on the backend API.
   *
   * @returns An Observable that emits the response from the API, which indicates whether the deletion was successful.
   */
  deleteCurrentPaymentCard() {
    return this._apiService.sendDeleteRequest<GenericResponseInterface<PaymentCardInterface>>(
      'payments/paymentCard',
    );
  }
}
