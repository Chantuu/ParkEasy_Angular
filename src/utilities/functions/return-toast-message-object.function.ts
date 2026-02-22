import { ToastMessageOptions } from 'primeng/api';

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
