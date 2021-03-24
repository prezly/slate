import React, { FunctionComponent } from 'react';

import ClippedRing from './ClippedRing';
import Head from './Head';

interface Props {
    height: number;
    /**
     * 0 ≤ progress ≤ 1
     */
    progress: number;
    width: number;
}

const FiniteLoadingIndicator: FunctionComponent<Props> = ({ height, progress, width }) => (
    <>
        <ClippedRing clip={1} color="#B6E7C1" height={height} width={width} />
        <ClippedRing
            className="loading-indicator-v2__progress"
            clip={progress}
            color="#02AB5C"
            height={height}
            width={width}
        />
        <Head
            className="loading-indicator-v2__head"
            color="#02AB5C"
            height={height}
            width={width}
        />
        <Head
            className="loading-indicator-v2__head"
            color="#02AB5C"
            height={height}
            style={{
                transform: `rotate(${progress * 360}deg)`,
            }}
            width={width}
        />
    </>
);

export default FiniteLoadingIndicator;
