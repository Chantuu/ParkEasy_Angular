export function returnFormattedDate(dateTimeString: string) {
  return new Date(dateTimeString).toLocaleString('en-US', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}
