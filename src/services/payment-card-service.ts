import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { PaymentCardResponseInterface } from '../utilities/interfaces/responses/payment-card-response.interface';
import { DeleteCurrentPaymentCardResponseInterface } from '../utilities/interfaces/responses/delete-current-payment-card-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentCardService {
  constructor(private _apiService: ApiService) {}

  getCurrentPaymentCard() {
    return this._apiService.sendGetRequest<PaymentCardResponseInterface>('payments/paymentCard');
  }

  deleteCurrentPaymentCard() {
    return this._apiService.sendDeleteRequest<DeleteCurrentPaymentCardResponseInterface>(
      'payments/paymentCard',
    );
  }
}
