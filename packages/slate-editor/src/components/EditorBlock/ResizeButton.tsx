import classNames from 'classnames';
import React from 'react';
import type { MouseEvent } from 'react';

import { Resize } from '#icons';

import styles from './ResizeButton.module.scss';

interface Props {
    className?: string;
}

export function ResizeButton({ className }: Props) {
    return (
        <div className={classNames(styles.handle, className)}>
            <button className={styles.button} onMouseDown={preventDefault} type="button">
                <Resize className={styles.icon} />
            </button>
        </div>
    );
}

function preventDefault(event: MouseEvent): void {
    event.preventDefault();
}
