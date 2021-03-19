import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { EmptyNewsroom } from 'icons';

type Size = 'small' | 'medium' | 'large';

interface Props {
    className?: string;
    name?: string;
    size: Size;
    square?: boolean;
    src?: string;
}

const SIZES: Record<Size, number> = {
    small: 32,
    medium: 48,
    large: 64,
};

const Avatar: FunctionComponent<Props> = ({ className, name, size, square, src }) => {
    const computedSize = SIZES[size];
    const classnames = classNames(className, `avatar-thumb-${computedSize}`, {
        'img-circle': !square,
        rounded: square,
    });
    return src ? (
        <img
            alt={name}
            className={classnames}
            src={src}
            style={{
                minWidth: computedSize,
                width: computedSize,
                minHeight: computedSize,
                height: computedSize,
            }}
            title={name}
        />
    ) : (
        <EmptyNewsroom
            className={classnames}
            height={SIZES[size]}
            role="presentation"
            width={SIZES[size]}
        />
    );
};

export default Avatar;
