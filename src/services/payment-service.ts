import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { CalculateReservationPriceResponseInterface } from '../utilities/interfaces/responses/calculate-reservation-price-response.interface';
import { ReservationEnum } from '../utilities/enums/reservation-status.enum';
import { PayReservationRequestBodyInterface } from '../utilities/interfaces/request-bodies/pay-reservation-request-body.interface';
import { PaymentResponseInterface } from '../utilities/interfaces/responses/payment-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _apiService: ApiService) {}

  calculateReservationPrice() {
    return this._apiService.sendGetRequest<CalculateReservationPriceResponseInterface>(
      'reservation/calculatePrice',
    );
  }

  payCompleted(amountToPay: number) {
    return this._apiService.sendPostRequest<
      PayReservationRequestBodyInterface,
      PaymentResponseInterface
    >('payments/pay', {
      reservationStatus: ReservationEnum.COMPLETED,
      amount: amountToPay,
    });
  }

  payCancelled() {
    return this._apiService.sendPostRequest<
      PayReservationRequestBodyInterface,
      PaymentResponseInterface
    >('payments/pay', {
      reservationStatus: ReservationEnum.CANCELLED,
    });
  }
}
