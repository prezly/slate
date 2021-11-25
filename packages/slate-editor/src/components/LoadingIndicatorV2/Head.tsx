import type { CSSProperties, FunctionComponent } from 'react';
import * as React from 'react';

interface Props {
    className?: string;
    color: string;
    height: number;
    width: number;
    style?: CSSProperties;
}

const Head: FunctionComponent<Props> = ({ className, color, height, width, style }) => (
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

export default Head;
