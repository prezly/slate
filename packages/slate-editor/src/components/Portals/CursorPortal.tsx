import RangeFix from 'rangefix';
import React, { FunctionComponent } from 'react';

import BasePortal from './BasePortal';
import { PortalProps } from './types';

export function updateCursorPortalRect() {
    try {
        const selection = window.getSelection();

        if (selection === null) {
            return null;
        }

        // polyfill for collapsed selection, because Safari returns invalid coordinates.
        return RangeFix.getBoundingClientRect(selection.getRangeAt(0));
    } catch (error) {
        // Sometimes (for example, when resizing the contained image inside the editor),
        // the `getRangeAt(0)` will fail, because the selection is invalid at that moment:
        // "Failed to execute 'getRangeAt' on 'Selection': 0 is not a valid index."
        // There's noting to do with this error.
        return null;
    }
}

/**
 * @deprecated Please use `CursorPortalV2` instead.
 */
const CursorPortal: FunctionComponent<PortalProps> = (props) => (
    <BasePortal {...props} getElementRect={updateCursorPortalRect} />
);

export default CursorPortal;
