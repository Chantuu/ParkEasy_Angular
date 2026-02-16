import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _apiUrl = import.meta.env.NG_APP_API_URL;

  constructor(
    private _httpClient: HttpClient,
    private _zone: NgZone,
  ) {}

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

  public streamData<T>(url: string): Observable<T> {
    return new Observable<T>((observer) => {
      const eventSource = new EventSource(`${this._apiUrl}/${url}`, {
        withCredentials: true,
      });

      eventSource.onmessage = (event) => {
        this._zone.run(() => {
          try {
            const parsedData: T = JSON.parse(event.data);
            observer.next(parsedData);
          } catch (error) {
            observer.error(error);
          }
        });
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };

      // 🔥 IMPORTANT CLEANUP
      return () => {
        eventSource.close();
      };
    });
  }
}
