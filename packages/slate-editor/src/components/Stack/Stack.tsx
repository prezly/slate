import classNames from 'classnames';
import * as React from 'react';

import styles from './Stack.module.scss';

type StackSizes = Extract<keyof typeof styles, `--row-${string}`> extends `--row-${infer Rest}`
    ? Rest
    : never;

export interface StackProps {
    spacing: StackSizes;
    direction?: 'column' | 'row';
}

export function Stack(props: React.PropsWithChildren<StackProps>) {
    return (
        <div
            className={classNames(
                styles.stack,
                styles[`--${props.direction ?? 'row'}-${props.spacing}`],
            )}
        >
            {props.children}
        </div>
    );
}
