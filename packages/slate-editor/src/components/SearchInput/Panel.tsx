import { type Placement } from '@popperjs/core';
import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import React, { forwardRef } from 'react';

import styles from './Panel.module.scss';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    footer?: ReactNode;
    placement?: Placement;
}

export const Panel = forwardRef<HTMLDivElement, Props>(
    ({ children, className, footer, placement = 'bottom', ...attributes }, forwardedRef) => {
        return (
            <div
                {...attributes}
                ref={forwardedRef}
                className={classNames(className, styles.Panel, {
                    [styles.top]: placement === 'top',
                    [styles.bottom]: placement === 'bottom',
                })}
            >
                {children}
                {footer && <div className={styles.Footer}>{footer}</div>}
            </div>
        );
    },
);

Panel.displayName = 'Panel';
