import React from 'react';

import { useUniqueId } from '#lib';

interface Props {
    className?: string;
    clip: number;
    color: string;
    height: number;
    width: number;
}

function getClipPoints(clip: number) {
    if (clip <= 0.125) {
        const x = 16 + (16 * clip) / 0.125;
        return `16,16, 16,0 ${x},0`;
    }

    if (clip <= 0.375) {
        const y = (32 * (clip - 0.125)) / 0.25;
        return `16,16 16,0 32,0 32,${y}`;
    }

    if (clip <= 0.625) {
        const x = 32 - (32 * (clip - 0.375)) / 0.25;
        return `16,16 16,0 32,0 32,32 ${x},32`;
    }

    if (clip <= 0.875) {
        const y = 32 - (32 * (clip - 0.625)) / 0.25;
        return `16,16 16,0 32,0 32,32 0,32 0,${y}`;
    }

    const x = (16 * (clip - 0.875)) / 0.125;
    return `16,16 16,0 32,0 32,32 0,32 0,0 ${x},0`;
}

export function ClippedRing({ className, clip, color, height, width }: Props) {
    const maskId = useUniqueId('clipped-ring-mask-');
    const points = getClipPoints(clip);

    return (
        <svg
            className={className}
            height={height}
            viewBox="0 0 32 32"
            width={width}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <clipPath id={maskId}>
                    <polygon points={points} />
                </clipPath>
            </defs>

            <circle clipPath={`url(#${maskId})`} cx="16" cy="16" fill={color} r="16" />
            <circle cx="16" cy="16" fill="#FFFFFF" r="10" />
        </svg>
    );
}
