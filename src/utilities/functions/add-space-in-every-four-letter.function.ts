/**
 * Helper function that takes a string value and adds a space after every four characters,
 * but excludes last four characters.
 *
 * @param value - The input string value to which spaces will be added every four characters.
 * @returns The modified string with spaces added every four characters.
 */
export function addSpaceInEveryFourLetter(value: string): string {
  return value
    .replace(/\s+/g, '') // remove existing spaces
    .replace(/(.{4})/g, '$1 ') // add space every 4 chars
    .trim(); // remove trailing space
}
