import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import { CloseButton } from '#components';

import styles from './Frame.module.scss';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    // Variations
    format?: 'card' | '16:9';
    dragOver?: boolean;
    progress?: boolean | number;
    selected?: boolean;
    // Callbacks
    onRemove?: () => void;
}

export const Frame = forwardRef<HTMLDivElement, Props>(
    (
        { children, className, dragOver, format = 'card', progress, selected, onRemove, ...props },
        forwardedRef,
    ) => {
        const progressPercentage = typeof progress === 'number' ? `${progress}%` : undefined;

        return (
            <div
                {...props}
                className={classNames(className, styles.Frame, {
                    [styles.dragOver]: dragOver,
                    [styles.knownProgress]: typeof progress === 'number',
                    [styles.unknownProgress]: progress === true,
                    [styles.selected]: selected,
                })}
                data-placeholder-format={format}
                ref={forwardedRef}
            >
                <div className={styles.Progress} style={{ width: progressPercentage }} />
                <CloseButton
                    className={classNames(styles.CloseButton, {
                        [styles.hidden]: dragOver,
                    })}
                    onClick={onRemove}
                    title="Delete this block"
                />
                {children}
            </div>
        );
    },
);

Frame.displayName = 'Frame';
