import classNames from 'classnames';
import React from 'react';

import { Plus as PlusIcon } from '#icons';

import styles from './Plus.module.scss';

interface Props {
    className?: string;
}

export function Plus({ className }: Props) {
    return (
        <span className={classNames(styles.Plus, className)}>
            <PlusIcon className={styles.Icon} />
        </span>
    );
}
