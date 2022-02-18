import classNames from 'classnames';
import type { CSSProperties, ReactNode } from 'react';
import React, { forwardRef } from 'react';

import styles from './Toolbox.module.scss';

interface Props {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export const Panel = forwardRef<HTMLDivElement, Props>(function (
    { children, className, style },
    ref,
) {
    return (
        <div className={classNames(styles.panel, className)} ref={ref} style={style}>
            {children}
        </div>
    );
});

Panel.displayName = 'Panel';
