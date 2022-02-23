import classNames from 'classnames';
import RangeFix from 'rangefix';
import type { FunctionComponent } from 'react';
import React, { useCallback, useRef, useState } from 'react';
import type { Editor } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

import { useIsMouseDown } from '#lib';

import type { Props as BasePortalV2Props } from './BasePortalV2';
import { BasePortalV2 } from './BasePortalV2';
import './TextSelectionPortalV2.scss';
import { convertClientRect } from './convertClientRect';

interface Props extends Omit<BasePortalV2Props, 'getBoundingClientRect'> {}

/**
 * TextSelectionPortalV2 is a modification of CursorPortalV2 that uses
 * selection start location as its origin to achieve better UX during editing.
 */
export const TextSelectionPortalV2: FunctionComponent<Props> = ({
    children,
    className,
    containerElement,
    ...props
}) => {
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
            const rect = getSelectionRect(editor);
            if (
                editor.selection &&
                rect === null &&
                containerElement?.contains(document.activeElement)
            ) {
                return lastRect.current;
            }
            return (lastRect.current = rect);
        },
        [editor, containerElement],
    );

    return (
        <BasePortalV2
            {...props}
            containerElement={containerElement}
            className={classNames('text-selection-portal-v2', className, {
                'text-selection-portal-v2--selecting': isMouseDown && !isMouseDownInPortal,
            })}
            getBoundingClientRect={getBoundingClientRect}
            onMouseDown={() => setIsMouseDownInPortal(true)}
            onMouseUp={() => setIsMouseDownInPortal(false)}
        >
            {children}
        </BasePortalV2>
    );
};

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
