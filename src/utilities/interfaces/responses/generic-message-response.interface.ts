/**
 * Interface representing the structure of a generic response, only which includes a status property of type string
 * and a message property of type string that provides additional message information.
 */
export interface GenericMessageResponse {
  status: string;
  message: string;
}
