import { useLayoutEffect, useState } from 'react';

import { useMountedState } from './react-use';

/**
 * Returns number of milliseconds since the given datetime.
 * If the starting datetime is not provided, the time is counted
 * since the moment the component has been mounted.
 */
export function useElapsed(start?: Date): number {
    const [elapsed, setElapsed] = useState<number>(0);
    const isMounted = useMountedState();

    useLayoutEffect(() => {
        const startTimestamp = start?.getTime() ?? Date.now();
        let animationFrameId: number;

        function loop() {
            return (animationFrameId = requestAnimationFrame(() => {
                if (isMounted()) {
                    setElapsed(Date.now() - startTimestamp);
                }
                loop();
            }));
        }

        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [start?.toDateString()]);

    return elapsed;
}
