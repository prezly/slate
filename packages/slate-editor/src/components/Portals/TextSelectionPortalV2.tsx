import classNames from 'classnames';
import type { Rect } from 'rangefix';
import RangeFix from 'rangefix';
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';

import { useIsMouseDown } from '#lib';

import type { Props as BasePortalV2Props } from './BasePortalV2';
import { BasePortalV2 } from './BasePortalV2';
import './TextSelectionPortalV2.scss';

interface Props extends Omit<BasePortalV2Props, 'getBoundingClientRect'> {}

/**
 * TextSelectionPortalV2 is a modification of CursorPortalV2 that uses
 * selection start location as its origin to achieve better UX during editing.
 */
export const TextSelectionPortalV2: FunctionComponent<Props> = ({ className, ...props }) => {
    // When making a selection with mouse, it's possible that mouse will be moved so quickly that
    // it will hover over the `children` of the `BasePortalV2` and it will interfere with the
    // selection that is being made. To make sure, we disable `pointer-events` when selection
    // is being made.
    const isMouseDown = useIsMouseDown();
    const [isMouseDownInPortal, setIsMouseDownInPortal] = useState<boolean>(false);

    return (
        <BasePortalV2
            {...props}
            className={classNames('text-selection-portal-v2', className, {
                'text-selection-portal-v2--selecting': isMouseDown && !isMouseDownInPortal,
            })}
            getBoundingClientRect={updateCursorPortalRect}
            onMouseDown={() => setIsMouseDownInPortal(true)}
            onMouseUp={() => setIsMouseDownInPortal(false)}
        />
    );
};

function updateCursorPortalRect(): ClientRect | Rect | null {
    try {
        const selection = window.getSelection();

        if (selection === null) {
            return null;
        }

        // polyfill for collapsed selection, because Safari returns invalid coordinates.
        const [rect] = RangeFix.getClientRects(selection.getRangeAt(0)) || [];

        return rect || null;

    } catch (error) {
        // Sometimes (for example, when resizing the contained image inside the editor),
        // the `getRangeAt(0)` will fail, because the selection is invalid at that moment:
        // "Failed to execute 'getRangeAt' on 'Selection': 0 is not a valid index."
        // There's noting to do with this error.
        return null;
    }
}
