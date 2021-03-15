import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import Svg from '../Svg';

const DEFAULT_SIZE = 24;

const getSize = (width: string | number | undefined, height: string | number | undefined) => {
    if (typeof width === 'undefined' && typeof height === 'undefined') {
        return { width: DEFAULT_SIZE, height: DEFAULT_SIZE };
    }

    if (typeof width === 'undefined') {
        return { width: height, height };
    }

    if (typeof height === 'undefined') {
        return { width, height: width };
    }

    return { width, height };
};

interface Props {
    className?: string;
    fill?: string;
    height?: string | number;
    icon: BrowserSpriteSymbol;
    role?: string;
    width?: string | number;
}

const SvgIcon: FunctionComponent<Props> = ({
    className,
    fill = 'currentcolor',
    height,
    icon,
    role,
    width,
}) => {
    const size = getSize(width, height);

    return (
        <Svg
            className={classNames('svg-icon', className)}
            file={icon}
            fill={fill}
            height={size.height}
            role={role}
            width={size.width}
        />
    );
};

export default SvgIcon;
