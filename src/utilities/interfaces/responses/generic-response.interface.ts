/**
 * Interface representing the structure of a generic response object, which includes a status property of type string.
 */
export interface GenericResponseInterface<T> {
  status: string;
  data: T;
}
