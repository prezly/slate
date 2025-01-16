import classNames from 'classnames';
import React from 'react';

import type { ButtonBlockNode } from '../../ButtonBlockNode';

import styles from './Button.module.scss';

interface Props {
    node: ButtonBlockNode;
}

export function Button({ node }: Props) {
    const { label, variant, layout, href } = node;

    return (
        <div
            className={classNames(styles.Button, {
                [styles.active]: Boolean(href),
                [styles.outline]: variant === 'outline',
                [styles.notWide]: layout !== 'wide',
            })}
            role="button"
        >
            {label}
        </div>
    );
}
