import React, { useEffect, useState } from 'react';

import { LoadingIndicatorV2 } from './LoadingIndicatorV2';

export default {
    title: 'Components/LoadingIndicator',
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ background: 'rgba(27, 27, 54, 0.96)', padding: 30, width: 500 }}>
                <Story />
            </div>
        ),
    ],
};

export function InfiniteLoading() {
    return <LoadingIndicatorV2 />;
}

export function FiniteLoading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => Math.min(100, p + 5));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return <LoadingIndicatorV2 progress={progress * 0.01} onClick={() => setProgress(0)} />;
}
