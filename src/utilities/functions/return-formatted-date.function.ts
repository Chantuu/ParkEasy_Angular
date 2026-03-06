/**
 * Helper function that takes a date-time string as input and returns a formatted date string in the format "MMM DD, YYYY"
 * (e.g., "Jan 01, 2024").
 *
 * @param dateTimeString - The input date-time string to be formatted.
 * @returns The formatted date string.
 */
export function returnFormattedDate(dateTimeString: string) {
  return new Date(dateTimeString).toLocaleString('en-US', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}
