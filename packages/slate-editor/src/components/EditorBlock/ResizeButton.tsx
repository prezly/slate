import classNames from 'classnames';
import React from 'react';
import type { MouseEvent } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import * as Draggable from 'react-draggable';

import styles from './ResizeButton.module.scss';

type Position = 'left' | 'right';

interface Props {
    position: Position;
    onStart: (e: DraggableEvent, data: DraggableData, position: Position) => void | false;
    onDrag: (e: DraggableEvent, data: DraggableData, position: Position) => void | false;
    onStop: (e: DraggableEvent, data: DraggableData, position: Position) => void | false;
    className?: string;
    offsetParent?: Draggable.DraggableCoreProps['offsetParent'];
}

export function ResizeButton({
    className,
    position,
    offsetParent,
    onStart,
    onDrag,
    onStop,
}: Props) {
    return (
        <Draggable.DraggableCore
            offsetParent={offsetParent}
            onStart={(event, data) => onStart(event, data, position)}
            onDrag={(event, data) => onDrag(event, data, position)}
            onStop={(event, data) => onStop(event, data, position)}
        >
            <div className={classNames(styles.handle, className)}>
                <button className={styles.button} onMouseDown={preventDefault} type="button" />
            </div>
        </Draggable.DraggableCore>
    );
}

function preventDefault(event: MouseEvent): void {
    event.preventDefault();
}
