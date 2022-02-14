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
        <div className={classNames(styles.stack, selectSpaceClassName(props))}>
            {props.children}
        </div>
    );
}

function selectSpaceClassName(props: StackProps) {
    switch (props.direction) {
        case 'column': {
            switch (props.spacing) {
                case 'none':
                    return styles['--column-none'];
                case 'spacing-half':
                    return styles['--column-spacing-half'];
                case 'spacing-1':
                    return styles['--column-spacing-1'];
                case 'spacing-1-5':
                    return styles['--column-spacing-1-5'];
                case 'spacing-2':
                    return styles['--column-spacing-2'];
                case 'spacing-3':
                    return styles['--column-spacing-3'];
                case 'spacing-4':
                    return styles['--column-spacing-4'];
                case 'spacing-5':
                    return styles['--column-spacing-5'];
            }
        }

        case 'row': {
            switch (props.spacing) {
                case 'none':
                    return styles['--row-none'];
                case 'spacing-half':
                    return styles['--row-spacing-half'];
                case 'spacing-1':
                    return styles['--row-spacing-1'];
                case 'spacing-1-5':
                    return styles['--row-spacing-1-5'];
                case 'spacing-2':
                    return styles['--row-spacing-2'];
                case 'spacing-3':
                    return styles['--row-spacing-3'];
                case 'spacing-4':
                    return styles['--row-spacing-4'];
                case 'spacing-5':
                    return styles['--row-spacing-5'];
            }
        }

        default:
            return undefined;
    }
}
