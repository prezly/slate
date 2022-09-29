import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

import { Clear } from '#icons';

import styles from './ClearButton.module.scss';

type Props = Omit<HTMLAttributes<HTMLButtonElement>, 'children'>;

export function ClearButton({ className, ...attributes }: Props) {
    return (
        <button type="button" {...attributes} className={classNames(className, styles.ClearButton)}>
            <Clear className={styles.Icon} />
        </button>
    );
}
