import { GenericResponseInterface } from './generic-response.interface';

/**
 * Interface representing the structure of a generic response object that extends the GenericResponseInterface
 * and includes an additional message property.
 */
export interface GenericResponseExtendedInterface<T> extends GenericResponseInterface<T> {
  message: string;
}
