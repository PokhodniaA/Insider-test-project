export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomPosition(minPos: number, maxPos: number): number {
  return getRandomNumber(minPos, maxPos);
}

export function getMomentum(shoulder: number, weight: number): number {
  return shoulder * weight;
}
