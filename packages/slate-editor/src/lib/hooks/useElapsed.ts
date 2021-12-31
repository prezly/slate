import { useLayoutEffect, useState } from 'react';

import { useMountedState } from './react-use';

function useElapsed(): number {
    const [elapsed, setElapsed] = useState<number>(0);
    const isMounted = useMountedState();

    useLayoutEffect(() => {
        const startTimestamp = Date.now();
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
    });

    return elapsed;
}

export default useElapsed;
