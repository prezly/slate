import type { SelectAfterPrefix } from '@prezly/slate-editor/type-utils';
import classNames from 'classnames';
import * as React from 'react';

import styles from './Stack.module.scss';

export interface StackProps {
    spacing: SelectAfterPrefix<keyof typeof styles, 'spacing-'>;
    direction?: 'column' | 'row';
    verticalAligning?: 'start' | 'center' | 'end';
}

export function Stack(props: React.PropsWithChildren<StackProps>) {
    return (
        <div
            className={classNames(
                styles.stack,
                selectDirectionClassName(props),
                selectSpaceClassName(props),
                selectVerticalAlignClassName(props),
            )}
        >
            {props.children}
        </div>
    );
}

function selectVerticalAlignClassName(props: StackProps) {
    switch (props.verticalAligning) {
        case 'start':
            return styles['vertical-align-start'];
        case 'center':
            return styles['vertical-align-center'];
        case 'end':
            return styles['vertical-align-end'];
        default:
            return undefined;
    }
}

function selectDirectionClassName(props: StackProps) {
    switch (props.direction) {
        case 'column':
            return styles['column'];
        case 'row':
            return styles['row'];
        default:
            return undefined;
    }
}

function selectSpaceClassName(props: StackProps) {
    switch (props.spacing) {
        case 'none':
            return styles['spacing-none'];
        case 'half':
            return styles['spacing-half'];
        case '1':
            return styles['spacing-1'];
        case '1-5':
            return styles['spacing-1-5'];
        case '2':
            return styles['spacing-2'];
        case '2-5':
            return styles['spacing-2-5'];
        case '3':
            return styles['spacing-3'];
        case '4':
            return styles['spacing-4'];
        case '5':
            return styles['spacing-5'];
    }
}
