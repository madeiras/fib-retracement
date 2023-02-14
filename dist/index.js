"use strict";
/**
 * Calculate levels.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.levels = exports.getFibRetracement = void 0;
function calculate(_a) {
    var levels = _a.levels;
    if (!levels || typeof levels !== 'object' || Array.isArray(levels) || Object.keys(levels).length === 0) {
        throw new Error('Unable to compute fib trace with the referenced `levels`');
    }
    var one = Number(levels[1]);
    var zero = Number(levels[0]);
    if (isNaN(one) || isNaN(zero)) {
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
}
function getFibRetracement() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    if (values[0] && Object.prototype.hasOwnProperty.call(values[0], 'levels')) {
        return calculate(values[0]);
    }
    return calculate({ levels: { 0: values[1], 1: values[0] } });
}
exports.getFibRetracement = getFibRetracement;
/**
 * Levels.
 */
exports.levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
//# sourceMappingURL=index.js.map