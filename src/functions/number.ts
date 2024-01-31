/**
 * Generate a random integer within a specified range.
 *
 * @param {number} min - Minimum value (inclusive).
 * @param {number} max - Maximum value (inclusive).
 * @param {boolean} [decimal=false] - If true, generate a decimal number; otherwise, generate an integer.
 * @returns {number} - Random number within the specified range.
 */
export function randomInt(min: number, max: number, decimal?: boolean): number {
  if (decimal) {
    return Math.random() * (max - min) + min;
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

/**
 * Select a random element from the given array.
 *
 * @template T
 * @param {T[]} arr - The array from which to select a random element.
 * @returns {T | undefined} - Random element from the array, or undefined if the array is empty.
 */
export function random<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }

  const randomIndex = randomInt(0, arr.length - 1);
  return arr[randomIndex];
}
