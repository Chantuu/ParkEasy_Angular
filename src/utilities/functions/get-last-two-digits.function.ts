/**
 * Helper function that takes a number and returns the last two digits of that number.
 *
 * @param num - The input number from which the last two digits will be extracted.
 * @returns - The last two digits of the input number as a number.
 */
export function getLastTwoDigits(num: number): number {
  return Math.abs(num) % 100;
}
