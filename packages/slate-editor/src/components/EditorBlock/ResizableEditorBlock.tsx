import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import type { DraggableEventHandler } from 'react-draggable';
import { DraggableCore } from 'react-draggable';

import { useSize, Size } from '#lib';

import type { Props as EditorBlockProps } from './EditorBlock';
import { EditorBlock } from './EditorBlock';
import styles from './EditorBlock.module.scss';
import { ResizeButton } from './ResizeButton';

interface Props extends EditorBlockProps {
    onResize: (width: Size.Size) => void;
    resizable?: boolean;
    width: Size.Size;
}

const ZERO_PIXELS = Size.fromPixels(0);
const TEN_PERCENT = Size.fromPercents(10);
const HUNDRED_PERCENT = Size.fromPercents(100);

export const ResizableEditorBlock = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {
        children,
        onResize,
        renderBlock,
        renderMenu,
        resizable = true,
        width,
        ...attributes
    } = props;

    const [sizer, { width: containerWidth }] = useSize(Sizer);
    const [pixelWidth, setPixelWidth] = useState(ZERO_PIXELS);
    const [isResizing, setResizing] = useState(false);
    const handleResize: DraggableEventHandler = useCallback(
        function (_event, data) {
            const nextPixelWidth = Size.add(pixelWidth, Size.fromPixels(data.deltaX), containerWidth);
            setPixelWidth(
                Size.clamp(nextPixelWidth, TEN_PERCENT, HUNDRED_PERCENT, containerWidth),
            );
        },
        [containerWidth, pixelWidth],
    );
    const startResizing = useCallback(() => setResizing(true), [setResizing]);
    const stopResizing = useCallback(
        function () {
            setResizing(false);
            onResize(Size.toUnit(pixelWidth, width[1], containerWidth));
        },
        [Size.toString(pixelWidth), containerWidth],
    );

    useEffect(
        function () {
            if (containerWidth > 0 && containerWidth !== Infinity) {
                setPixelWidth(Size.toPixels(width, containerWidth));
            }
        },
        [Size.toString(width), containerWidth],
    );

    return (
        <EditorBlock
            {...attributes}
            ref={ref}
            renderBlock={({ isSelected }) => (
                <>
                    {renderBlock({ isSelected })}
                    {resizable && isSelected && (
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
            width={Size.toUnit(pixelWidth, width[1], containerWidth)}
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
