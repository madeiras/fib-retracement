/**
 * Get the fib retracement based on `0` and `1` fib retracement levels.
 */

export const getFibRetracement = ({ levels }: { levels: Record<number | string, number | string> }) => {
  if (!levels || typeof levels !== 'object' || Array.isArray(levels) || Object.keys(levels).length === 0) {
    throw new Error('Unable to compute fib trace with the referenced `levels`');
  }

  const zero = Number(levels[0]);
  const one = Number(levels[1]);

  if (isNaN(zero) || isNaN(one)) {
    return {};
  }

  const distance = Math.abs(one - zero);
  const operation = one > zero ? 
    (first: number, second: number) => first - second : 
    (first: number, second: number) => first + second;

  return Object.fromEntries(
    module.exports.levels.map(level => {
      const difference = (1 - level) * distance;
      const value = operation(Number(levels[1]), difference);

      return [level, value];
    })
  );
};

/**
 * Levels.
 */

export const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
