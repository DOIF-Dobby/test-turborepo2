/**
 * value가 min ~ max 사이에서 벗어나지 않게 한다.
 *
 * clamp(50, 0, 100) → 50
 *
 * clamp(-10, 0, 100) → 0
 *
 * clamp(150, 0, 100) → 100
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
