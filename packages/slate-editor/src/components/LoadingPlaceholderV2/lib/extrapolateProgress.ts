import { estimateProgress } from '#lib';

import type { ChangeEvent } from '../types';

const OPTIMISM = 0.9;
const SMOOTHING = 3;

interface Parameters {
    current: ChangeEvent;
    elapsed: number;
    estimatedDuration: number;
    history: ChangeEvent[];
}

export function extrapolateProgress({
    current,
    elapsed,
    estimatedDuration,
    history,
}: Parameters): number {
    const progressRemaining = 1 - current.progress;

    if (history.length <= 1) {
        const estimatedGain =
            progressRemaining * OPTIMISM * estimateProgress(elapsed, estimatedDuration, SMOOTHING);
        return current.progress + estimatedGain;
    }

    const firstEvent = history[0];
    const lastEvent = history[history.length - 1];
    const duration = lastEvent.timestamp - firstEvent.timestamp;
    const progressGain = lastEvent.progress - firstEvent.progress;
    const progressSpeed = duration === 0 ? 0 : progressGain / duration;
    const timeSinceLastEvent = current.timestamp - lastEvent.timestamp;
    const estimatedRemainingDuration = progressRemaining / progressSpeed;
    const estimatedGain =
        progressRemaining *
        OPTIMISM *
        estimateProgress(timeSinceLastEvent, estimatedRemainingDuration, SMOOTHING);
    const extrapolatedProgress = lastEvent.progress + estimatedGain;

    return Math.min(Math.max(extrapolatedProgress, current.progress), 1);
}
