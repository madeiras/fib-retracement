"use strict";
/**
 * Get the fib retracement based on `0` and `1` fib retracement levels.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.levels = exports.getFibRetracement = void 0;
var getFibRetracement = function (_a) {
    var levels = _a.levels;
    if (!levels || typeof levels !== 'object' || Array.isArray(levels) || Object.keys(levels).length === 0) {
        throw new Error('Unable to compute fib trace with the referenced `levels`');
    }
    var zero = Number(levels[0]);
    var one = Number(levels[1]);
    if (isNaN(zero) || isNaN(one)) {
        return {};
    }
    var distance = Math.abs(one - zero);
    var operation = one > zero ?
        function (first, second) { return first - second; } :
        function (first, second) { return first + second; };
    return Object.fromEntries(module.exports.levels.map(function (level) {
        var difference = (1 - level) * distance;
        var value = operation(Number(levels[1]), difference);
        return [level, value];
    }));
};
exports.getFibRetracement = getFibRetracement;
/**
 * Levels.
 */
exports.levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
//# sourceMappingURL=index.js.map