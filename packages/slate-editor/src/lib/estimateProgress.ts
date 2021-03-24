/**
 * A monotonically increasing function that returns values from 0 to 1.
 * Example plot: https://www.wolframalpha.com/input/?i=plot+%28%282+%2F+pi%29+*+arctan%28x+%2F+%28d+%2F+2%29%29%29+%5E+s%2C+x+%3D+0..5000%2C+d+%3D+1000%2C+s+%3D+1
 * @param elapsed How long is the action taking already (ms)
 * @param estimatedDuration How long is the action expected to take (ms).
   After half of this time, the progress will be 0.5 ^ smoothing
 * @param smoothing Higher the value, more pessimistic the guess will be. Defaults to 1.
   Cannot be less than or equal to 0.
 * @returns progress - a value in range [0, 1]
 */
const estimateProgress = (elapsed: number, estimatedDuration: number, smoothing = 1): number => {
    const halfwayThreshold = estimatedDuration / 2;
    return ((2 / Math.PI) * Math.atan(elapsed / halfwayThreshold)) ** smoothing;
};

export default estimateProgress;
