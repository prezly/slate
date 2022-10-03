import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import React, { forwardRef } from 'react';

import styles from './Panel.module.scss';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    footer?: ReactNode;
}

export const Panel = forwardRef<HTMLDivElement, Props>(
    ({ children, className, footer, ...attributes }, forwardedRef) => {
        return (
            <div {...attributes} ref={forwardedRef} className={classNames(className, styles.Panel)}>
                {children}
                {footer && <div className={styles.Footer}>{footer}</div>}
            </div>
        );
    },
);

Panel.displayName = 'Panel';
