import classNames from 'classnames';
import * as React from 'react';

import styles from './Stack.module.scss';

enum Spacing {
    SPACING_NONE = 'none',
    SPACING_HALF = 'half',
    SPACING_1 = '1',
    SPACING_1_5 = '1-5',
    SPACING_2 = '2',
    SPACING_2_5 = '2-5',
    SPACING_3 = '3',
    SPACING_4 = '4',
    SPACING_5 = '5',
}

export interface StackProps {
    spacing: `${Spacing}`;
    direction?: 'column' | 'row';
    verticalAligning?: 'start' | 'center' | 'end';
}

export function Stack(props: React.PropsWithChildren<StackProps>) {
    return (
        <div
            className={classNames(styles.stack, {
                // direction
                [styles.column]: props.direction === 'column',
                [styles.row]: props.direction === 'row',
                // vertical alignment
                [styles.alignStart]: props.verticalAligning === 'start',
                [styles.alignCenter]: props.verticalAligning === 'center',
                [styles.alignEnd]: props.verticalAligning === 'end',
            })}
            data-spacing={props.spacing === Spacing.SPACING_NONE ? undefined : props.spacing}
        >
            {props.children}
        </div>
    );
}
