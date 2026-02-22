import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { PaymentCardResponseInterface } from '../utilities/interfaces/responses/payment-card-response.interface';
import { PaymentCardFormInterface } from '../utilities/interfaces/forms/payment-card-form.interface';
import { GenericResponseInterface } from '../utilities/interfaces/responses/generic-response.interface';
import { PaymentCardInterface } from '../utilities/interfaces/object-interfaces/payment-card.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentCardService {
  constructor(private _apiService: ApiService) {}

  getCurrentPaymentCard() {
    return this._apiService.sendGetRequest<PaymentCardResponseInterface>('payments/paymentCard');
  }

  createPaymentCard(paymentCardData: PaymentCardFormInterface) {
    return this._apiService.sendPostRequest<PaymentCardFormInterface, PaymentCardResponseInterface>(
      'payments/paymentCard',
      paymentCardData,
    );
  }

  deleteCurrentPaymentCard() {
    return this._apiService.sendDeleteRequest<GenericResponseInterface<PaymentCardInterface>>(
      'payments/paymentCard',
    );
  }
}
