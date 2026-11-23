/**
 * Retracement levels, where `0` is the end of the move and `1` is its start
 */

export const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1] as const;

/**
 * Extension levels, measured from the start of the move, so `1` is its end
 */

export const extensionLevels = [1.272, 1.414, 1.618, 2, 2.618, 3.618, 4.236] as const;

export type ExtensionLevel = (typeof extensionLevels)[number];
export type NumericInput = number | string;
export type RetracementLevel = (typeof levels)[number];

export type FibExtension = Record<ExtensionLevel, number>;
export type FibRetracement = Record<RetracementLevel, number>;

export interface FibRange {
  end: NumericInput;
  start: NumericInput;
}

export interface FibRangeWithPrice extends FibRange {
  price: NumericInput;
}

/**
 * Convert an input to a finite number, rejecting anything `Number()` would silently coerce
 */

function toFiniteNumber({ name, value }: { name: string; value: unknown }): number {
  let parsed = Number.NaN;

  if (typeof value === 'number') {
    parsed = value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    parsed = Number(value);
  }

  if (!Number.isFinite(parsed)) {
    throw new TypeError(`Expected \`${name}\` to be a finite number or numeric string`);
  }

  return parsed;
}

/**
 * Price at `ratio` of the way from `from` to `to`, exact at both ends
 */

function interpolate({ from, ratio, to }: { from: number; ratio: number; to: number }): number {
  if (ratio === 1) {
    return to;
  }

  return from + ratio * (to - from);
}

/**
 * Map each ratio to its price
 */

function calculatePrices<Ratio extends number>({ from, ratios, to }: { from: number; ratios: readonly Ratio[]; to: number }): Record<Ratio, number> {
  const prices = {} as Record<Ratio, number>;

  for (const ratio of ratios) {
    prices[ratio] = interpolate({ from, ratio, to });
  }

  return prices;
}

/**
 * Get the retracement prices of a move, keyed by level
 */

export function getFibRetracement({ end, start }: FibRange): FibRetracement {
  return calculatePrices({
    from: toFiniteNumber({ name: 'end', value: end }),
    ratios: levels,
    to: toFiniteNumber({ name: 'start', value: start })
  });
}

/**
 * Get the extension prices beyond the end of a move, keyed by level
 */

export function getFibExtension({ end, start }: FibRange): FibExtension {
  return calculatePrices({
    from: toFiniteNumber({ name: 'start', value: start }),
    ratios: extensionLevels,
    to: toFiniteNumber({ name: 'end', value: end })
  });
}

/**
 * Get how far `price` has retraced the move, as a level
 * `0` at the end, `1` at the start, outside that range when beyond the move
 */

export function getFibRetracementLevel({ end, price, start }: FibRangeWithPrice): number {
  const endPrice = toFiniteNumber({ name: 'end', value: end });
  const currentPrice = toFiniteNumber({ name: 'price', value: price });
  const startPrice = toFiniteNumber({ name: 'start', value: start });

  if (startPrice === endPrice) {
    throw new RangeError('Expected `start` and `end` to be different');
  }

  const level = (currentPrice - endPrice) / (startPrice - endPrice);

  // Dividing zero by a negative range gives `-0`
  if (level === 0) {
    return 0;
  }

  return level;
}
