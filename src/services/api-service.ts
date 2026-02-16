import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _apiUrl = import.meta.env.NG_APP_API_URL;

  constructor(private _httpClient: HttpClient) {}

  sendGetRequest<ResponseT>(endpointUrl: string) {
    return this._httpClient.get<ResponseT>(`${this._apiUrl}/${endpointUrl}`, {
      withCredentials: true,
    });
  }

  sendPostRequest<BodyT, ResponseT>(endpointUrl: string, body: BodyT) {
    return this._httpClient.post<ResponseT>(`${this._apiUrl}/${endpointUrl}`, body, {
      withCredentials: true,
    });
  }

  sendDeleteRequest<ResponseT>(endpointUrl: string) {
    return this._httpClient.delete<ResponseT>(`${this._apiUrl}/${endpointUrl}`, {
      withCredentials: true,
    });
  }
}
