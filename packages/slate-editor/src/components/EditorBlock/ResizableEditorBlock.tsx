import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import type { DraggableEventHandler } from 'react-draggable';
import { DraggableCore } from 'react-draggable';

import { useSize } from '#lib';

import type { Props as EditorBlockProps } from './EditorBlock';
import { EditorBlock } from './EditorBlock';
import styles from './EditorBlock.module.scss';
import { ResizeButton } from './ResizeButton';

interface Props extends EditorBlockProps {
    onResize: (width: string) => void;
    width: string;
}

export const ResizableEditorBlock = forwardRef<HTMLDivElement, Props>(
    ({ renderBlock, renderMenu, onResize, width, ...props }, ref) => {
        const [sizer, size] = useSize(Sizer);
        const [isResizing, setResizing] = useState(false);
        const startResizing = useCallback(() => setResizing(true), [setResizing]);
        const stopResizing = useCallback(() => setResizing(false), [setResizing]);

        const handleResize: DraggableEventHandler = function (event, data) {
            console.log({
                event,
                data,
                width: size.width,
            });
        };

        return (
            <EditorBlock
                {...props}
                ref={ref}
                renderBlock={({ isSelected }) => (
                    <>
                        {sizer}
                        {renderBlock({ isSelected })}
                        <DraggableCore
                            onDrag={handleResize}
                            onStart={startResizing}
                            onStop={stopResizing}
                        >
                            <ResizeButton className={styles.resizeButton} />
                        </DraggableCore>
                    </>
                )}
                renderMenu={isResizing ? undefined : renderMenu}
                width={width}
            />
        );
    },
);

function Sizer() {
    return <div />;
}
