import { useEffect, useRef, useState } from 'react';
import { useRafLoop } from 'react-use';

import { useElapsed } from 'lib';

import { ChangeEvent } from '../types';

import extrapolateProgress from './extrapolateProgress';

/**
 * @param progress 0 ≤ progress ≤ 1
 * @param estimatedDuration How long is the action expected to take (ms)
 */
const useExtrapolatedProgress = (progress: number, estimatedDuration: number): number => {
    const elapsed = useElapsed();
    const [extrapolatedProgress, setExtrapolatedProgress] = useState<number>(progress);
    const changeEventsRef = useRef<ChangeEvent[]>([]);

    useEffect(() => {
        const changeEvent = { progress, timestamp: Date.now() };
        changeEventsRef.current = [...changeEventsRef.current, changeEvent];
    }, [progress]);

    useRafLoop(() => {
        const changeEvent = { progress, timestamp: Date.now() };
        const newExtrapolatedProgress = extrapolateProgress({
            current: changeEvent,
            elapsed,
            estimatedDuration,
            history: changeEventsRef.current,
        });

        if (newExtrapolatedProgress > extrapolatedProgress) {
            setExtrapolatedProgress(newExtrapolatedProgress);
        }
    });

    return extrapolatedProgress;
};

export default useExtrapolatedProgress;
