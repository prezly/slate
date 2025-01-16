import classNames from 'classnames';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import React, { forwardRef } from 'react';

import styles from './Toolbox.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export const Panel = forwardRef<HTMLDivElement, Props>(function (
    { children, className, ...props },
    ref,
) {
    return (
        <div {...props} ref={ref} className={classNames(styles.panel, className)}>
            {children}
        </div>
    );
});

Panel.displayName = 'Panel';
