# fib-retracement

A tool to easily calculate fibonacci retracement and extension levels from the start and end of a price move.

## Status

[![npm version][npm-image]][npm-url]
[![build status][gh-actions-image]][gh-actions-url]

## Installation

Install the package via `pnpm`:

```sh
❯ pnpm add fib-retracement
```

or via `npm`:

```sh
❯ npm install fib-retracement --save
```

Requires Node.js 22 or later. Ships both ES module and CommonJS builds, with TypeScript declarations and no dependencies.

## Usage

```js
import { getFibExtension, getFibRetracement, getFibRetracementLevel } from 'fib-retracement';

// or

const { getFibExtension, getFibRetracement, getFibRetracementLevel } = require('fib-retracement');
```

Every function takes a single object. `start` is where the move began (level `1`) and `end` is where it finished (level `0`). Both accept a number or a numeric string.

### `getFibRetracement({ end, start })`

Returns the retracement prices of a move, keyed by level.

```js
const retracement = getFibRetracement({ end: 10, start: 0 });

/**
 * retracement = {
 *   0: 10,
 *   0.236: 7.640000000000001,
 *   0.382: 6.18,
 *   0.5: 5,
 *   0.618: 3.8200000000000003,
 *   0.786: 2.1399999999999997,
 *   1: 0
 * }
 */
```

### `getFibExtension({ end, start })`

Returns the extension prices beyond the end of a move, keyed by level. Levels are measured from `start`, so `1` would be `end` and `2` is the move repeated once more.

```js
const extension = getFibExtension({ end: 200, start: 100 });

/**
 * extension = {
 *   1.272: 227.2,
 *   1.414: 241.4,
 *   1.618: 261.8,
 *   2: 300,
 *   2.618: 361.8,
 *   3.618: 461.8,
 *   4.236: 523.5999999999999
 * }
 */
```

### `getFibRetracementLevel({ end, price, start })`

Returns how far a price has retraced the move, as a level. This is the inverse of `getFibRetracement`.

```js
getFibRetracementLevel({ end: 200, price: 150, start: 100 }); // 0.5
getFibRetracementLevel({ end: 200, price: 200, start: 100 }); // 0, at the end of the move
getFibRetracementLevel({ end: 200, price: 50, start: 100 }); // 1.5, beyond the start
getFibRetracementLevel({ end: 200, price: 250, start: 100 }); // -0.5, beyond the end
```

### `levels` and `extensionLevels`

The levels used by `getFibRetracement` and `getFibExtension` are exported as readonly tuples.

```js
import { extensionLevels, levels } from 'fib-retracement';

/**
 * levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]
 * extensionLevels = [1.272, 1.414, 1.618, 2, 2.618, 3.618, 4.236]
 */
```

Iterate these when you need the prices in level order, because JavaScript lists whole-number object keys such as `0`, `1` and `2` before the others.

```js
const retracement = getFibRetracement({ end: 10, start: 0 });

for (const level of levels) {
  console.log(level, retracement[level]);
}
```

### Errors

- `TypeError` when `end`, `start` or `price` is not a finite number or a numeric string
- `RangeError` when `getFibRetracementLevel` is called with `start` equal to `end`

### Precision

Results are plain JavaScript numbers. `start` and `end` are always returned exactly, while the levels in between can carry floating-point noise such as `7.640000000000001`. Round to your instrument's tick size before displaying or comparing them.

## Migrating from 0.3

The positional and `{ levels }` call styles were replaced by a single named-parameter signature.

```js
// Before
getFibRetracement(0, 10);
getFibRetracement({ levels: { 0: 10, 1: 0 } });

// After
getFibRetracement({ end: 10, start: 0 });
```

Other changes:

- Invalid input now throws a `TypeError` instead of returning `{}`
- `''`, `null` and other values that `Number()` coerces to `0` are rejected
- Node.js 22 or later is required

## Tests

```
❯ pnpm test
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/fib-retracement.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/fib-retracement
[gh-actions-image]: https://github.com/madeiras/fib-retracement/actions/workflows/ci.yml/badge.svg
[gh-actions-url]: https://github.com/madeiras/fib-retracement/actions/workflows/ci.yml
