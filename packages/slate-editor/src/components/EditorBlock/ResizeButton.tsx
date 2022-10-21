import classNames from 'classnames';
import React from 'react';
import type { MouseEvent } from 'react';

import styles from './ResizeButton.module.scss';

interface Props {
    className?: string;
    position: 'left' | 'right';
}

export function ResizeButton({ className, position }: Props) {
    return (
        <div
            className={classNames(styles.handle, className, {
                [styles.left]: position === 'left',
                [styles.right]: position === 'right',
            })}
        >
            <button className={styles.button} onMouseDown={preventDefault} type="button" />
        </div>
    );
}

function preventDefault(event: MouseEvent): void {
    event.preventDefault();
}
