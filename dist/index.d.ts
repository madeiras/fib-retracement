/**
 * Calculate levels.
 */
interface CalculateInterface {
    levels: Record<number | string, number | string>;
}
/**
 * Get the fib retracement based on `0` and `1` fib retracement levels.
 */
export declare function getFibRetracement(start: number | string, end: number | string): any;
export declare function getFibRetracement({ levels }: CalculateInterface): any;
/**
 * Levels.
 */
export declare const levels: number[];
export {};
