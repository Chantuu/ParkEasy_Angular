import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { ReservationEnum } from '../utilities/enums/reservation-status.enum';
import { PayReservationRequestBodyInterface } from '../utilities/interfaces/request-bodies/pay-reservation-request-body.interface';
import { PaymentResponseInterface } from '../utilities/interfaces/responses/payment-response.interface';
import { GenericResponseInterface } from '../utilities/interfaces/responses/generic-response.interface';
import { ReservationPriceInterface } from '../utilities/interfaces/object-interfaces/reservation-price.interface';

@Injectable({
  providedIn: 'root',
})
/**
 * Service responsible for handling all payment-related operations, such as calculating reservation prices
 * and processing payments for completed or cancelled reservations.
 */
export class PaymentService {
  /**
   * Constructor for the ApiService used for injection.
   *
   * @param _apiService - The ApiService for making HTTP requests to the backend API.
   */
  constructor(private _apiService: ApiService) {}

  /**
   * Method for calculating the price of the current reservation. It sends a GET request to the appropriate endpoint
   * on the backend API and returns the calculated price.
   *
   * @returns An Observable that emits the response from the API, which includes the calculated reservation price if the request is successful.
   */
  calculateReservationPrice() {
    return this._apiService.sendGetRequest<GenericResponseInterface<ReservationPriceInterface>>(
      'reservation/calculatePrice',
    );
  }

  /**
   * Method for processing payment for a completed reservation. It takes the amount to pay as a parameter,
   * sends a POST request to the backend API, and returns the response.
   *
   * @param amountToPay - The amount that needs to be paid for the completed reservation, typed as a number.
   * @returns An Observable that emits the response from the API, which includes payment details if the payment is successful.
   */
  payCompleted(amountToPay: number) {
    return this._apiService.sendPostRequest<
      PayReservationRequestBodyInterface,
      PaymentResponseInterface
    >('payments/pay', {
      reservationStatus: ReservationEnum.COMPLETED,
      amount: amountToPay,
    });
  }

  /**
   * Method for processing payment for a cancelled reservation. It sends a POST request to the backend API
   * with the appropriate reservation status, and returns the response.
   *
   * @returns An Observable that emits the response from the API, which includes payment details if the payment is successful.
   */
  payCancelled() {
    return this._apiService.sendPostRequest<
      PayReservationRequestBodyInterface,
      PaymentResponseInterface
    >('payments/pay', {
      reservationStatus: ReservationEnum.CANCELLED,
    });
  }
}
