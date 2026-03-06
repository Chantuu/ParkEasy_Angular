import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Centralized service for making API calls to the backend. It provides methods for sending GET, POST, and DELETE requests,
 * as well as a method for streaming data from the backend using Server-Sent Events (SSE). This service abstracts away
 * the details of making HTTP requests and handling SSE, providing a clean and consistent API
 * for the rest of the application to interact with the backend.
 */
export class ApiService {
  /**
   * Private property containing the base URL for the API, loaded from environment variables.
   */
  private readonly _apiUrl = import.meta.env.NG_APP_API_URL;

  /**
   * Constructor for the ApiService used for injection.
   * @param _httpClient - The Angular HttpClient for making HTTP requests.
   * @param _zone - The NgZone for running code inside the Angular zone.
   */
  constructor(
    private _httpClient: HttpClient,
    private _zone: NgZone,
  ) {}

  /**
   * Generic method for sending GET requests to the backend API. It takes an endpoint URL (relative to the base API URL)
   * and returns an Observable of the specified response type.
   *
   * @param endpointUrl - The endpoint URL (relative to the base API URL) to which the GET request should be sent.
   * @template ResponseT - The expected type of the response from the API, allowing for type safety when using this method.
   * @returns An Observable that emits the response from the API, typed as ResponseT.
   */
  sendGetRequest<ResponseT>(endpointUrl: string) {
    return this._httpClient.get<ResponseT>(`${this._apiUrl}/${endpointUrl}`, {
      withCredentials: true,
    });
  }

  /**
   * Generic method for sending POST requests to the backend API. It takes an endpoint URL (relative to the base API URL)
   * and a request body. It returns an Observable of the specified response type.
   *
   * @param endpointUrl - The endpoint URL (relative to the base API URL) to which the POST request should be sent.
   * @param body - The request body, typed as BodyT.
   * @template BodyT - The type of the request body.
   * @template ResponseT - The expected type of the response from the API, allowing for type safety when using this method.
   * @returns An Observable that emits the response from the API, typed as ResponseT.
   */
  sendPostRequest<BodyT, ResponseT>(endpointUrl: string, body: BodyT) {
    return this._httpClient.post<ResponseT>(`${this._apiUrl}/${endpointUrl}`, body, {
      withCredentials: true,
    });
  }

  /**
   * Generic method for sending DELETE requests to the backend API. It takes an endpoint URL (relative to the base API URL)
   * and returns an Observable of the specified response type.
   *
   * @param endpointUrl - The endpoint URL (relative to the base API URL) to which the DELETE request should be sent.
   * @template ResponseT - The expected type of the response from the API, allowing for type safety when using this method.
   * @returns An Observable that emits the response from the API, typed as ResponseT.
   */
  sendDeleteRequest<ResponseT>(endpointUrl: string) {
    return this._httpClient.delete<ResponseT>(`${this._apiUrl}/${endpointUrl}`, {
      withCredentials: true,
    });
  }

  /**
   * Generic method for streaming data from the backend API using Server-Sent Events (SSE).
   * It takes an endpoint URL (relative to the base API URL) and returns an Observable of the specified response type.
   * The method creates a new EventSource to listen for SSE from the backend, and emits parsed data through the Observable
   * whenever a new message is received. It also handles errors and ensures that the EventSource
   * is properly closed when the Observable is unsubscribed.
   *
   * @param url - The endpoint URL (relative to the base API URL) from which to stream data using SSE.
   * @template T - The expected type of the data received from the SSE stream, allowing for type safety when using this method.
   * @returns An Observable that emits data received from the SSE stream.
   */
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

      // EventSource Cleanup
      return () => {
        eventSource.close();
      };
    });
  }
}
