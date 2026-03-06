import { ToastMessageOptions } from 'primeng/api';

/**
 * Helper function that takes in parameters for toast message configuration and returns an object formatted according
 * to the ToastMessageOptions interface, which is used for displaying toast notifications in the application.
 *
 * @param cardSeverity - The severity level of the toast message, which can be either 'error' or 'success'.
 * @param summaryText - The summary text that will be displayed in the toast message, providing a brief overview of the message content.
 * @param detailText - The detailed text that will be displayed in the toast message, providing more specific information about the message content.
 * @returns - An object formatted according to the ToastMessageOptions interface for displaying the toast message.
 */
export function returnToastMessageObject(
  cardSeverity: 'error' | 'success',
  summaryText: string,
  detailText: string,
): ToastMessageOptions {
  return {
    severity: cardSeverity,
    summary: summaryText,
    detail: detailText,
    life: 2400,
    closable: true,
    styleClass: 'black-text-toast',
  };
}
