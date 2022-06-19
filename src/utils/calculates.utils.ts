/**
 * Return random number in a range from min to max
 * @param min
 * @param max
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Return random coorfinate in a range from min to max
 * @param minPos
 * @param maxPos
 */
export function getRandomPosition(minPos: number, maxPos: number): number {
  return getRandomNumber(minPos, maxPos);
}

/**
 * Calculate momentum
 * @param shoulder
 * @param weight
 */
export function getMomentum(shoulder: number, weight: number): number {
  return shoulder * weight;
}
