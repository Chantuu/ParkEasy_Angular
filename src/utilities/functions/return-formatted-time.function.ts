/**
 * Helper function that takes a date-time string as input and returns a formatted time string
 * in the format "HH:mm" (e.g., "14:30").
 *
 * @param dateTimeString - The input date-time string to be formatted.
 * @returns The formatted time string.
 */
export function returnFormattedTime(dateTimeString: string) {
  return new Date(dateTimeString).toLocaleTimeString('en-GB', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
