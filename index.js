/**
 * Exports.
 */

module.exports = {
  /**
   * Get the fib retracement based on at least two fib retracement levels.
   */

  getFibRetracement({ levels } = {}) {
    if (!levels || typeof levels !== 'object' || Array.isArray(levels) || Object.keys(levels).length === 0) {
      throw new Error('Unable to compute fib trace with the referenced `levels`');
    }

    const keys = Object.keys(levels);

    keys.forEach(key => {
      if (!module.exports.levels.includes(Number(key))) {
        throw new Error('The referenced `levels` are not valid');
      }
    });

    if (levels[0] === undefined || levels[1] === undefined) {
      return {};
    }

    const distance = Math.abs(Number(levels[1]) - Number(levels[0]));
    const operation =
      Number(levels[1]) > Number(levels[0])
        ? (first, second) => Number(first) - Number(second)
        : (first, second) => Number(first) + Number(second);

    return Object.fromEntries(
      module.exports.levels.map(level => {
        const difference = (1 - Number(level)) * Number(distance);

        const value = operation(levels[1], difference);

        return [level, Number(value)];
      })
    );
  },

  /**
   * Levels.
   */

  levels: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]
};
