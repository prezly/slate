import { identity } from '@technically/lodash';
import classNames from 'classnames';
import RangeFix from 'rangefix';
import React, { useCallback, useRef, useState } from 'react';
import type { Editor } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

import { convertClientRect, useIsMouseDown } from '#lib';

import type { Props as BasePortalV2Props } from './BasePortalV2';
import { BasePortalV2 } from './BasePortalV2';
import styles from './TextSelectionPortalV2.module.scss';

interface Props extends Omit<BasePortalV2Props, 'getBoundingClientRect'> {
    modifySelectionRect?: (rect: ClientRect) => ClientRect | null;
}

/**
 * TextSelectionPortalV2 is a modification of CursorPortalV2 that uses
 * selection start location as its origin to achieve better UX during editing.
 */
export function TextSelectionPortalV2({
    children,
    className,
    containerElement,
    modifySelectionRect = identity,
    ...props
}: Props) {
    const editor = useSlateStatic();
    const lastRect = useRef<ClientRect | null>(null);
    // When making a selection with mouse, it's possible that mouse will be moved so quickly that
    // it will hover over the `children` of the `BasePortalV2` and it will interfere with the
    // selection that is being made. To make sure, we disable `pointer-events` when selection
    // is being made.
    const isMouseDown = useIsMouseDown();
    const [isMouseDownInPortal, setIsMouseDownInPortal] = useState<boolean>(false);
    const getBoundingClientRect = useCallback(
        function () {
            const selectionRect = getSelectionRect(editor);
            const rect = selectionRect ? modifySelectionRect(selectionRect) : null;
            if (
                editor.selection &&
                rect === null &&
                containerElement?.contains(document.activeElement)
            ) {
                return lastRect.current;
            }
            return (lastRect.current = rect || null);
        },
        [editor, containerElement, modifySelectionRect],
    );

    return (
        <BasePortalV2
            {...props}
            containerElement={containerElement}
            className={classNames(styles.TextSelectionPortal, className, {
                [styles.selecting]: isMouseDown && !isMouseDownInPortal,
            })}
            getBoundingClientRect={getBoundingClientRect}
            onMouseDown={() => setIsMouseDownInPortal(true)}
            onMouseUp={() => setIsMouseDownInPortal(false)}
        >
            {children}
        </BasePortalV2>
    );
}

function getSelectionRect(editor: Editor): ClientRect | null {
    if (!editor.selection) return null;

    try {
        const range = ReactEditor.toDOMRange(editor, editor.selection);

        const [rect] = RangeFix.getClientRects(range) || [];

        return rect ? convertClientRect(rect) : null;
    } catch (error) {
        // Sometimes (for example, when resizing the contained image inside the editor),
        // the `getRangeAt(0)` will fail, because the selection is invalid at that moment:
        // "Failed to execute 'getRangeAt' on 'Selection': 0 is not a valid index."
        // There's noting to do with this error.
        return null;
    }
}
