export function addSpaceInEveryFourLetter(value: string): string {
  return value
    .replace(/\s+/g, '') // remove existing spaces
    .replace(/(.{4})/g, '$1 ') // add space every 4 chars
    .trim(); // remove trailing space
}
