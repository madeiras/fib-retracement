/**
 * Calculate levels.
 */

function calculate({ levels: inputLevels }: CalculateInterface) {
  if (!inputLevels || typeof inputLevels !== 'object' || Array.isArray(inputLevels) || Object.keys(inputLevels).length === 0) {
    throw new Error('Unable to compute fib trace with the referenced `levels`');
  }

  const one = Number(inputLevels[1]);
  const zero = Number(inputLevels[0]);

  if (isNaN(one) || isNaN(zero)) {
    return {};
  }

  const distance = Math.abs(one - zero);
  const operation = one > zero ?
    (first: number, second: number) => first - second :
    (first: number, second: number) => first + second;

  return Object.fromEntries(
    levels.map(level => {
      const difference = (1 - level) * distance;
      const value = operation(Number(inputLevels[1]), difference);

      return [level, value];
    })
  );
}

interface CalculateInterface {
  levels: Record<number | string, number | string>
} 

/**
 * Get the fib retracement based on `0` and `1` fib retracement levels.
 */

export function getFibRetracement(start: number | string, end: number | string);
export function getFibRetracement({ levels }: CalculateInterface);
export function getFibRetracement(...values: unknown[]) {
  const payload = values[0] && Object.prototype.hasOwnProperty.call(values[0], 'levels') ? 
    values[0] : 
    { levels: { 0: values[1], 1: values[0] } }

  return calculate(payload as CalculateInterface);
}

/**
 * Levels.
 */

export const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];