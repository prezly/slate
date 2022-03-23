import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import type { DraggableEventHandler } from 'react-draggable';
import { DraggableCore } from 'react-draggable';

import { useSize } from '#lib';
import { clamp } from '#lodash';

import type { Props as EditorBlockProps } from './EditorBlock';
import { EditorBlock } from './EditorBlock';
import styles from './EditorBlock.module.scss';
import { ResizeButton } from './ResizeButton';

interface Props extends EditorBlockProps {
    onResize: (width: string) => void;
    width: string;
}

export const ResizableEditorBlock = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { renderBlock, renderMenu, onResize, width, children, ...attributes } = props;

    const [sizer, { width: containerWidth }] = useSize(Sizer);
    const [pixelWidth, setPixelWidth] = useState(0); // pixel equivalent of `width%`
    const [realtimeWidth, setRealtimeWidth] = useState(width); // local state for `width%`
    const [isResizing, setResizing] = useState(false);
    const handleResize: DraggableEventHandler = useCallback(
        function (_event, data) {
            const nextPixelWidth = clamp(pixelWidth + data.deltaX, 100, containerWidth);
            setPixelWidth(nextPixelWidth);
            setRealtimeWidth(percent(100.0 * nextPixelWidth / containerWidth));
        },
        [containerWidth, pixelWidth],
    );
    const startResizing = useCallback(() => setResizing(true), [setResizing]);
    const stopResizing = useCallback(
        function () {
            const nextWidth = percent(100.0 * pixelWidth / containerWidth);
            setResizing(false);
            setRealtimeWidth(nextWidth);
            onResize(nextWidth);
        },
        [pixelWidth, containerWidth],
    );

    useEffect(function () {
        setRealtimeWidth(width);
    }, [width]);

    useEffect(
        function () {
            if (containerWidth > 0 && containerWidth !== Infinity) {
                setPixelWidth(containerWidth * parseFloat(width) * 0.01);
            }
        },
        [width, containerWidth],
    );

    return (
        <EditorBlock
            {...attributes}
            ref={ref}
            renderBlock={({ isSelected }) => (
                <>
                    {renderBlock({ isSelected })}
                    {isSelected && (
                        <DraggableCore
                            onDrag={handleResize}
                            onStart={startResizing}
                            onStop={stopResizing}
                        >
                            <div>
                                <ResizeButton className={styles.resizeButton} />
                            </div>
                        </DraggableCore>
                    )}
                </>
            )}
            renderMenu={isResizing ? undefined : renderMenu}
            selected={isResizing || undefined}
            width={realtimeWidth}
        >
            {sizer}
            {children}
        </EditorBlock>
    );
});

ResizableEditorBlock.displayName = 'ResizableEditorBlock';

function Sizer() {
    return <div />;
}

function percent(value: number): string {
    return `${value.toFixed(2)}%`;
}
