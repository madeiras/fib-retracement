/* eslint-disable sort-keys */
'use strict';

const fibRetracement = require('./index');

/**
 * Test `fib-retracement`.
 */

describe('fib-retracement', () => {
  describe('getFibRetracement()', () => {
    it('should throw an error if `levels` is not defined', () => {
      try {
        fibRetracement.getFibRetracement();

        fail();
      } catch (e) {
        expect(e.message).toBe('Unable to compute fib trace with the referenced `levels`');
      }
    });

    ['foo', [], {}, 1, null, undefined].forEach(value => {
      it('should throw an error if `levels` is not a valid json object', () => {
        try {
          fibRetracement.getFibRetracement({ levels: value });

          fail();
        } catch (e) {
          expect(e.message).toBe('Unable to compute fib trace with the referenced `levels`');
        }
      });
    });

    ['foo', {}, NaN, undefined].forEach(value => {
      it('should return an empty object if the `Number` casted `0` is NaN', () => {
        expect(fibRetracement.getFibRetracement({ levels: { 0: value, 1: 1 } })).toEqual({});
      });
    });

    ['foo', {}, NaN, undefined].forEach(value => {
      it('should return an empty object if the `Number` casted `1` is NaN', () => {
        expect(fibRetracement.getFibRetracement({ levels: { 0: 0, 1: value } })).toEqual({});
      });
    });

    it('should convert the values to `Number`', () => {
      expect(fibRetracement.getFibRetracement({ levels: { 0: '-61.43', 1: '70.1' } })).toEqual({
        0: -61.43000000000001,
        0.236: -30.388920000000013,
        0.382: -11.185540000000003,
        0.5: 4.334999999999994,
        0.618: 19.85553999999999,
        0.786: 41.95258,
        1: 70.1
      });
    });

    it('should return the correct fib levels for downward fibs', () => {
      expect(fibRetracement.getFibRetracement({ levels: { 0: -61.43, 1: 70.1 } })).toEqual({
        0: -61.43000000000001,
        0.236: -30.388920000000013,
        0.382: -11.185540000000003,
        0.5: 4.334999999999994,
        0.618: 19.85553999999999,
        0.786: 41.95258,
        1: 70.1
      });
    });

    it('should return the correct fib keys for upward fibs', () => {
      expect(fibRetracement.getFibRetracement({ levels: { 0: 6427.56, 1: 6280.0 } })).toEqual({
        0: 6427.56,
        0.236: 6392.73584,
        0.382: 6371.19208,
        0.5: 6353.780000000001,
        0.618: 6336.367920000001,
        0.786: 6311.57784,
        1: 6280
      });
    });
  });
});
