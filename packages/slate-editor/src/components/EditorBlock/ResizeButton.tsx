import classNames from 'classnames';
import React from 'react';
import type { MouseEvent } from 'react';
import { DraggableCore } from 'react-draggable';

import { Resize } from '#icons';

import styles from './ResizeButton.module.scss';

interface Props {
    className?: string;
}

export function ResizeButton({ className }: Props) {
    return (
        <DraggableCore>
            <div className={classNames(styles.handle, className)}>
                <button className={styles.button} onMouseDown={preventDefault} type="button">
                    <Resize className={styles.icon} />
                </button>
            </div>
        </DraggableCore>
    );
}

function preventDefault(event: MouseEvent): void {
    event.preventDefault();
}
