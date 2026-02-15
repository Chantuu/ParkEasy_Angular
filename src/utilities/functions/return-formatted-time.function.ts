export function returnFormattedTime(dateTimeString: string) {
  return new Date(dateTimeString).toLocaleTimeString('en-GB', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
