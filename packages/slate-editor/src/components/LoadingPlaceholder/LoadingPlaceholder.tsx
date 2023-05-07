import { clamp } from '@technically/lodash';
import classNames from 'classnames';
import type { HTMLAttributes, ComponentType } from 'react';
import React, { forwardRef } from 'react';

import { useInfiniteProgress } from '#lib';

import styles from './LoadingPlaceholder.module.scss';

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    className?: string;
    icon?: false | ComponentType<{ className?: string }>;
    description?: false | string;
    estimatedDuration?: number;
    /**
     * 0 ≤ progress ≤ 100
     */
    progress?: 'auto' | number;
}

export const LoadingPlaceholder = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {
        className,
        icon = false,
        description = false,
        estimatedDuration = undefined,
        progress: reportedProgress = 'auto',
        ...attributes
    } = props;
    const approxProgress = useInfiniteProgress(estimatedDuration);
    const progress = clamp(reportedProgress === 'auto' ? approxProgress : reportedProgress, 0, 100);

    return (
        <div
            {...attributes}
            style={{
                height: 240,
                ...attributes.style,
            }}
            className={classNames(styles.LoadingPlaceholder, className)}
            ref={ref}
        >
            {icon && <Icon component={icon} />}
            {description && <Description progress={progress}>{description}</Description>}
            <ProgressBar progress={progress} />
        </div>
    );
});

LoadingPlaceholder.displayName = 'LoadingPlaceholder';

function Description(props: { children: string; className?: string; progress: number }) {
    return (
        <div className={classNames(styles.Description, props.className)}>
            <span className={styles.Message}>{props.children}...</span>
            <span className={styles.Progress}>{props.progress.toFixed(0)}%</span>
        </div>
    );
}

function Icon(props: { className?: string; component: ComponentType<HTMLAttributes<SVGElement>> }) {
    return <props.component className={classNames(styles.Icon, props.className)} />;
}

function ProgressBar(props: { className?: string; progress: number }) {
    return (
        <div className={classNames(styles.ProgressBar, props.className)}>
            <div className={styles.ProgressBarValue} style={{ width: `${props.progress}%` }} />
        </div>
    );
}
