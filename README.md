# fib-retracement

A tool to easily calculate the fibonacci retracement levels based on both extremes (0 and 1).

## Installation

Install the package via `yarn`:

```sh
❯ yarn add fib-retracement
```

or via `npm`:

```sh
❯ npm install fib-retracement --save
```

## Usage

A single method is exported called `getFibRetracement`. For convenience `levels` are also exported in case you need them.

```js
const { getFibRetracement, levels } = require('fib-retracement');

/*
  levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]
*/

const fib = getFibRetracement({ levels: { 0: 10, 1: 0 } });

/*
  fib = {
    0: 10,
    0.236: 7.640000000000001,
    0.382: 6.18,
    0.5: 5,
    0.618: 3.8200000000000003,
    0.786: 2.1399999999999997,
    1: 0
  }
*/
```

__NOTE__: The method supports fibonacci retracement calculations as long as both extremes are provided, i.e. `0` and `1`.

## Tests

```
❯ yarn test
```

## Release

```sh
❯ yarn release ["major" | "minor" | "patch" | <custom version number>] # default: patch
```

## License

MIT
