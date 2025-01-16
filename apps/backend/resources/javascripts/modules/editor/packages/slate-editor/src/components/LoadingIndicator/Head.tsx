import type { CSSProperties } from 'react';
import React from 'react';

interface Props {
    className?: string;
    color: string;
    height: number;
    width: number;
    style?: CSSProperties;
}

export function Head({ className, color, height, width, style }: Props) {
    return (
        <svg
            className={className}
            height={height}
            style={style}
            viewBox="0 0 32 32"
            width={width}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="16" cy="3" fill={color} r="3" />
        </svg>
    );
}
