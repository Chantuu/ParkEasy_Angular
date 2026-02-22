import { GenericResponseInterface } from './generic-response.interface';

export interface GenericResponseExtendedInterface<T> extends GenericResponseInterface<T> {
  message: string;
}
