import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  type NumericInput,
  extensionLevels,
  getFibExtension,
  getFibRetracement,
  getFibRetracementLevel,
  levels
} from './index';

const invalidValues: unknown[] = ['foo', '', '  ', Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, null, undefined, {}, [], true];
const precision = 8;

/**
 * Test `fib-retracement`
 */

describe('fib-retracement', () => {
  describe('levels', () => {
    it('should export the retracement levels', () => {
      expect(levels).toEqual([0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]);
    });

    it('should export the extension levels', () => {
      expect(extensionLevels).toEqual([1.272, 1.414, 1.618, 2, 2.618, 3.618, 4.236]);
    });
  });

  describe('getFibRetracement()', () => {
    it.each(invalidValues)('should throw an error if `end` is %o', value => {
      expect(() => getFibRetracement({ end: value as NumericInput, start: 1 })).toThrow(
        new TypeError('Expected `end` to be a finite number or numeric string')
      );
    });

    it.each(invalidValues)('should throw an error if `start` is %o', value => {
      expect(() => getFibRetracement({ end: 0, start: value as NumericInput })).toThrow(
        new TypeError('Expected `start` to be a finite number or numeric string')
      );
    });

    it('should return the retracement prices for an upward move', () => {
      expect(getFibRetracement({ end: 6427.56, start: 6280 })).toEqual({
        0: 6427.56,
        0.236: expect.closeTo(6392.73584, precision),
        0.382: expect.closeTo(6371.19208, precision),
        0.5: expect.closeTo(6353.78, precision),
        0.618: expect.closeTo(6336.36792, precision),
        0.786: expect.closeTo(6311.57784, precision),
        1: 6280
      });
    });

    it('should return the retracement prices for a downward move', () => {
      expect(getFibRetracement({ end: -61.43, start: 70.1 })).toEqual({
        0: -61.43,
        0.236: expect.closeTo(-30.38892, precision),
        0.382: expect.closeTo(-11.18554, precision),
        0.5: expect.closeTo(4.335, precision),
        0.618: expect.closeTo(19.85554, precision),
        0.786: expect.closeTo(41.95258, precision),
        1: 70.1
      });
    });

    it('should accept numeric strings', () => {
      expect(getFibRetracement({ end: '4.74', start: '4.59' })).toEqual({
        0: 4.74,
        0.236: expect.closeTo(4.7046, precision),
        0.382: expect.closeTo(4.6827, precision),
        0.5: expect.closeTo(4.665, precision),
        0.618: expect.closeTo(4.6473, precision),
        0.786: expect.closeTo(4.6221, precision),
        1: 4.59
      });
    });

    it('should return the same price for every level if `start` equals `end`', () => {
      expect(Object.values(getFibRetracement({ end: 42.5, start: 42.5 }))).toEqual(levels.map(() => 42.5));
    });

    it.each([
      { end: -61.43, start: 70.1 },
      { end: 0.00012345, start: 0.00009876 },
      { end: 1, start: 1e16 },
      { end: 67250.5, start: 58912.25 }
    ])('should return the exact `end` and `start` for $end and $start', ({ end, start }) => {
      const retracement = getFibRetracement({ end, start });

      expect(retracement[0]).toBe(end);
      expect(retracement[1]).toBe(start);
    });

    it('should be typed by retracement level', () => {
      expectTypeOf(getFibRetracement({ end: 10, start: 0 })).toEqualTypeOf<Record<0 | 0.236 | 0.382 | 0.5 | 0.618 | 0.786 | 1, number>>();
    });
  });

  describe('getFibExtension()', () => {
    it.each(invalidValues)('should throw an error if `end` is %o', value => {
      expect(() => getFibExtension({ end: value as NumericInput, start: 1 })).toThrow(
        new TypeError('Expected `end` to be a finite number or numeric string')
      );
    });

    it.each(invalidValues)('should throw an error if `start` is %o', value => {
      expect(() => getFibExtension({ end: 0, start: value as NumericInput })).toThrow(
        new TypeError('Expected `start` to be a finite number or numeric string')
      );
    });

    it('should return the extension prices for an upward move', () => {
      expect(getFibExtension({ end: 200, start: 100 })).toEqual({
        1.272: expect.closeTo(227.2, precision),
        1.414: expect.closeTo(241.4, precision),
        1.618: expect.closeTo(261.8, precision),
        2: expect.closeTo(300, precision),
        2.618: expect.closeTo(361.8, precision),
        3.618: expect.closeTo(461.8, precision),
        4.236: expect.closeTo(523.6, precision)
      });
    });

    it('should return the extension prices for a downward move', () => {
      expect(getFibExtension({ end: 100, start: 200 })).toEqual({
        1.272: expect.closeTo(72.8, precision),
        1.414: expect.closeTo(58.6, precision),
        1.618: expect.closeTo(38.2, precision),
        2: expect.closeTo(0, precision),
        2.618: expect.closeTo(-61.8, precision),
        3.618: expect.closeTo(-161.8, precision),
        4.236: expect.closeTo(-223.6, precision)
      });
    });

    it('should accept numeric strings', () => {
      expect(getFibExtension({ end: '200', start: '100' })).toEqual(getFibExtension({ end: 200, start: 100 }));
    });

    it('should be typed by extension level', () => {
      expectTypeOf(getFibExtension({ end: 200, start: 100 })).toEqualTypeOf<Record<1.272 | 1.414 | 1.618 | 2 | 2.618 | 3.618 | 4.236, number>>();
    });
  });

  describe('getFibRetracementLevel()', () => {
    it.each(invalidValues)('should throw an error if `end` is %o', value => {
      expect(() => getFibRetracementLevel({ end: value as NumericInput, price: 1, start: 1 })).toThrow(
        new TypeError('Expected `end` to be a finite number or numeric string')
      );
    });

    it.each(invalidValues)('should throw an error if `price` is %o', value => {
      expect(() => getFibRetracementLevel({ end: 0, price: value as NumericInput, start: 1 })).toThrow(
        new TypeError('Expected `price` to be a finite number or numeric string')
      );
    });

    it.each(invalidValues)('should throw an error if `start` is %o', value => {
      expect(() => getFibRetracementLevel({ end: 0, price: 1, start: value as NumericInput })).toThrow(
        new TypeError('Expected `start` to be a finite number or numeric string')
      );
    });

    it('should throw an error if `start` equals `end`', () => {
      expect(() => getFibRetracementLevel({ end: 100, price: 150, start: '100' })).toThrow(
        new RangeError('Expected `start` and `end` to be different')
      );
    });

    it.each([
      { end: -61.43, start: 70.1 },
      { end: 200, start: 100 }
    ])('should return `0` at the `end` and `1` at the `start` for $end and $start', ({ end, start }) => {
      expect(getFibRetracementLevel({ end, price: end, start })).toBe(0);
      expect(getFibRetracementLevel({ end, price: start, start })).toBe(1);
    });

    it('should return the level of a price inside the move', () => {
      expect(getFibRetracementLevel({ end: 200, price: 150, start: 100 })).toBe(0.5);
      expect(getFibRetracementLevel({ end: 100, price: 125, start: 200 })).toBe(0.25);
    });

    it('should return a level above `1` for a price beyond the `start`', () => {
      expect(getFibRetracementLevel({ end: 200, price: 50, start: 100 })).toBe(1.5);
    });

    it('should return a negative level for a price beyond the `end`', () => {
      expect(getFibRetracementLevel({ end: 200, price: 250, start: 100 })).toBe(-0.5);
    });

    it('should accept numeric strings', () => {
      expect(getFibRetracementLevel({ end: '200', price: '150', start: '100' })).toBe(0.5);
    });

    it.each(levels)('should return %d for the price `getFibRetracement()` gives that level', level => {
      const range = { end: 6427.56, start: 6280 };
      const price = getFibRetracement(range)[level];

      expect(getFibRetracementLevel({ ...range, price })).toBeCloseTo(level, precision);
    });

    it('should be typed as a number', () => {
      expectTypeOf(getFibRetracementLevel({ end: 200, price: 150, start: 100 })).toEqualTypeOf<number>();
    });
  });
});
