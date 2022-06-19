export type InterpolationParams = {
  x: number,
  x1: number,
  x2: number,
  fx1: number,
  fx2: number
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function linearInterpolation({x, x1, x2, fx1, fx2}: InterpolationParams): number {
  return fx1 + (x - x1) * ((fx2 - fx1) / (x2 - x1));
}

export function getLeftDistanceFromCenter(pos: number, minPos: number, maxPos: number): number {
  return linearInterpolation({
    x: pos,
    x1: minPos,
    x2: maxPos,
    fx1: maxPos,
    fx2: minPos
  });
}

export function getRandomPosition(minPos: number, maxPos: number): number {
  return getRandomNumber(minPos, maxPos);
}

export function getMomentum(shoulder: number, weight: number): number {
  return shoulder * weight;
}
