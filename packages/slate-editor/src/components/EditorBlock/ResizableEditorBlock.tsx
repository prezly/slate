import React, { forwardRef, useCallback, useState } from 'react';
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

export const ResizableEditorBlock = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { renderBlock, renderMenu, onResize, width, children, ...attributes } = props;
    // const latest = useLatest(props);
    // const [realtimeWidth, setRealtimeWidth] = useState(width);
    const [sizer, size] = useSize(Sizer);
    const [isResizing, setResizing] = useState(false);
    const startResizing = useCallback(() => setResizing(true), [setResizing]);
    const stopResizing = useCallback(() => setResizing(false), [setResizing]);

    const handleResize: DraggableEventHandler = useCallback(
        function (event, data) {
            console.log({
                event,
                data,
                // realtimeWidth,
                width: size.width,
            });
        },
        [size.width],
    );

    return (
        <EditorBlock
            {...attributes}
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
                        <div>
                            <ResizeButton className={styles.resizeButton} />
                        </div>
                    </DraggableCore>
                </>
            )}
            renderMenu={isResizing ? undefined : renderMenu}
            width={width}
        >
            {children}
        </EditorBlock>
    );
});

function Sizer() {
    return <div />;
}
