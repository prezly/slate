import React, { FunctionComponent } from 'react';

interface Props {
    className?: string;
    file: BrowserSpriteSymbol;
    fill?: string;
    height?: string | number;
    role?: string;
    width?: string | number;
}

const Svg: FunctionComponent<Props> = ({
    className,
    file,
    fill = 'currentcolor',
    height,
    role,
    width,
}) => (
    <svg
        className={className}
        fill={fill}
        height={height}
        role={role}
        viewBox={file.viewBox}
        width={width}
    >
        <use xlinkHref={`#${file.id}`} />
    </svg>
);

export default Svg;
