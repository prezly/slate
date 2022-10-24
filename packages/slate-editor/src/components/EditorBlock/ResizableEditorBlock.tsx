import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import type { DraggableEventHandler } from 'react-draggable';
import * as Draggable from 'react-draggable';

import { mergeRefs, useLatest, useSize } from '#lib';

import type { Props as EditorBlockProps } from './EditorBlock';
import { EditorBlock, renderInjectionPoint } from './EditorBlock';
import styles from './EditorBlock.module.scss';
import { ResizeButton } from './ResizeButton';
import type { SizeString } from './Size';
import { clamp, convert, Size, toPixels, toString, unit, Unit } from './Size';

interface Props extends EditorBlockProps {
    onResize: (width: SizeString) => void;
    resizable?: boolean;
    width: SizeString;
    minWidth?: string;
    maxWidth?: string;
}

const ZERO_PIXELS = Size(0, Unit.PIXELS);
const HUNDRED_PERCENT = Size(100, Unit.PERCENTS);

export const ResizableEditorBlock = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {
        align,
        onResize,
        renderBelowFrame,
        renderEditableFrame,
        renderReadOnlyFrame,
        renderMenu,
        resizable = true,
        width,
        minWidth = '100px',
        maxWidth = '100%',
        ...attributes
    } = props;
    const latest = useLatest({ ...props, minWidth, maxWidth });

    const [sizer, { width: containerWidth }] = useSize(Sizer);
    const [pixelWidth, setPixelWidth] = useState(0);
    const [isResizing, setResizing] = useState(false);
    const isInvertedResizing = align === Alignment.RIGHT;
    const [blockElement, setBlockElement] = useState<HTMLElement | null>(null);

    /**
     * Clamp given Size value within the provided minWidth/maxWidth constraints.
     */
    const constrainSize = useCallback(
        function (size: Size) {
            return clamp(
                size,
                Size(latest.current.minWidth),
                Size(latest.current.maxWidth),
                containerWidth,
            );
        },
        [containerWidth],
    );

    const handleResizeEvent: DraggableEventHandler = useCallback(
        function (_event, { deltaX }) {
            setPixelWidth(function (currentPixelWidth) {
                const delta = isInvertedResizing ? -deltaX : deltaX;
                const nextPixelWidth = Size(currentPixelWidth + delta, Unit.PIXELS);

                return toPixels(
                    constrainSize(
                        clamp(nextPixelWidth, ZERO_PIXELS, HUNDRED_PERCENT, containerWidth),
                    ),
                    containerWidth,
                ).value;
            });
        },
        [containerWidth, constrainSize, isInvertedResizing],
    );
    const handleResizingStarted = useCallback(() => setResizing(true), [setResizing]);
    const handleResizingFinished = useCallback(
        function () {
            setResizing(false);
            onResize(toString(convert(Size(pixelWidth, Unit.PIXELS), unit(width), containerWidth)));
        },
        [pixelWidth, containerWidth],
    );

    useEffect(
        /**
         * Recalculate pixelWidth when outer width properties change.
         */
        function () {
            if (containerWidth > 0 && containerWidth !== Infinity) {
                setPixelWidth(constrainSize(toPixels(Size(width), containerWidth)).value);
            }
        },
        [width, containerWidth, constrainSize],
    );

    function renderFrame(props: { isSelected: boolean }) {
        return (
            <>
                {renderInjectionPoint(renderReadOnlyFrame ?? renderEditableFrame, props)}
                {resizable && props.isSelected && (
                    <Draggable.DraggableCore
                        offsetParent={blockElement ?? undefined}
                        onDrag={handleResizeEvent}
                        onStart={handleResizingStarted}
                        onStop={handleResizingFinished}
                    >
                        <div contentEditable={false}>
                            <ResizeButton
                                className={classNames(
                                    styles.ResizeButton,
                                    isInvertedResizing ? styles.left : styles.right,
                                )}
                                position={isInvertedResizing ? 'left' : 'right'}
                            />
                        </div>
                    </Draggable.DraggableCore>
                )}
            </>
        );
    }

    return (
        <EditorBlock
            {...attributes}
            align={align}
            ref={mergeRefs(setBlockElement, ref)}
            renderBelowFrame={({ isSelected }) => (
                <>
                    {sizer}
                    {renderInjectionPoint(renderBelowFrame, { isSelected })}
                </>
            )}
            renderEditableFrame={renderEditableFrame ? renderFrame : undefined}
            renderReadOnlyFrame={renderReadOnlyFrame ? renderFrame : undefined}
            renderMenu={isResizing ? undefined : renderMenu}
            selected={isResizing || undefined}
            width={
                resizable
                    ? toString(convert(Size(pixelWidth, Unit.PIXELS), unit(width), containerWidth))
                    : width
            }
        />
    );
});

ResizableEditorBlock.displayName = 'ResizableEditorBlock';

function Sizer() {
    return <div contentEditable={false} />;
}
