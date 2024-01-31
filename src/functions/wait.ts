/**
 * Asynchronously waits for the specified number of seconds.
 *
 * @param {number} seconds - The number of seconds to wait.
 * @returns {Promise<void>} - A promise that resolves after the specified time.
 */
export async function wait(seconds: number): Promise<void> {
    const milliseconds = seconds * 1000;
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
}