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
export class PaymentService {
  constructor(private _apiService: ApiService) {}

  calculateReservationPrice() {
    return this._apiService.sendGetRequest<GenericResponseInterface<ReservationPriceInterface>>(
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
