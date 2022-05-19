import classNames from 'classnames';
import type { HTMLAttributes, ReactNode , FunctionComponent } from 'react';
import React, { forwardRef } from 'react';

import { useExtrapolatedProgress } from './lib';
import styles from './LoadingPlaceholderV2.module.scss';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    children: (props: { percent: string }) => ReactNode;
    className?: string;
    estimatedDuration: number;
    /**
     * 0 ≤ progress ≤ 1
     */
    progress?: number;
}

export const Placeholder = forwardRef<HTMLDivElement, Props>(
    ({ children, className, estimatedDuration, progress = 0, ...props }, ref) => {
        const extrapolatedProgress = useExtrapolatedProgress(progress, estimatedDuration);
        const percent = `${(100 * extrapolatedProgress).toFixed(0)}%`;

        return (
            <div {...props} className={classNames(styles.LoadingPlaceholder, className)} ref={ref}>
                {children({ percent })}
            </div>
        );
    },
);

Placeholder.displayName = 'forwardRef(LoadingPlaceholderV2.Placeholder)';

export function Description(props: { children: string; className?: string; percent: string }) {
    return (
        <div className={classNames(styles.Description, props.className)}>
            <span className={styles.Message}>{props.children}...</span>
            <span className={styles.Progress}>{props.percent}</span>
        </div>
    );
}

export function Icon(props: {
    className?: string;
    icon: FunctionComponent<HTMLAttributes<SVGElement>>;
}) {
    return <props.icon className={classNames(styles.Icon, props.className)} />;
}

export function ProgressBar(props: { className?: string; percent: string }) {
    return (
        <div className={classNames(styles.ProgressBar, props.className)}>
            <div className={styles.ProgressBarValue} style={{ width: props.percent }} />
        </div>
    );
}
