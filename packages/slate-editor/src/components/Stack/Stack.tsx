import classNames from 'classnames';
import * as React from 'react';

import styles from './Stack.module.scss';

type StackSizes = Extract<
    keyof typeof styles,
    `stack--row-${string}`
> extends `stack--row-${infer Rest}`
    ? Rest
    : never;

export interface StackProps {
    spacing: StackSizes;
    direction?: 'column' | 'row';
    verticalAligning?: 'start' | 'center' | 'end';
}

export function Stack(props: React.PropsWithChildren<StackProps>) {
    return (
        <div
            className={classNames(
                styles.stack,
                selectSpaceClassName(props),
                selectVerticalAlign(props),
            )}
        >
            {props.children}
        </div>
    );
}

function selectVerticalAlign(props: StackProps) {
    switch (props.verticalAligning) {
        case 'start':
            return styles['stack--vertical-align-start'];
        case 'center':
            return styles['stack--vertical-align-center'];
        case 'end':
            return styles['stack--vertical-align-end'];
        default:
            return undefined;
    }
}

function selectSpaceClassName(props: StackProps) {
    switch (props.direction) {
        case 'column': {
            switch (props.spacing) {
                case 'none':
                    return styles['stack--column-none'];
                case 'spacing-half':
                    return styles['stack--column-spacing-half'];
                case 'spacing-1':
                    return styles['stack--column-spacing-1'];
                case 'spacing-1-5':
                    return styles['stack--column-spacing-1-5'];
                case 'spacing-2':
                    return styles['stack--column-spacing-2'];
                case 'spacing-2-5':
                    return styles['stack--column-spacing-2-5'];
                case 'spacing-3':
                    return styles['stack--column-spacing-3'];
                case 'spacing-4':
                    return styles['stack--column-spacing-4'];
                case 'spacing-5':
                    return styles['stack--column-spacing-5'];
            }
        }

        case 'row': {
            switch (props.spacing) {
                case 'none':
                    return styles['stack--row-none'];
                case 'spacing-half':
                    return styles['stack--row-spacing-half'];
                case 'spacing-1':
                    return styles['stack--row-spacing-1'];
                case 'spacing-1-5':
                    return styles['stack--row-spacing-1-5'];
                case 'spacing-2':
                    return styles['stack--row-spacing-2'];
                case 'spacing-2-5':
                    return styles['stack--row-spacing-2-5'];
                case 'spacing-3':
                    return styles['stack--row-spacing-3'];
                case 'spacing-4':
                    return styles['stack--row-spacing-4'];
                case 'spacing-5':
                    return styles['stack--row-spacing-5'];
            }
        }

        default:
            return undefined;
    }
}
