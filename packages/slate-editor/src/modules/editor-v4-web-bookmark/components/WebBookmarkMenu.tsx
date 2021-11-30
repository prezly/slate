import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import { useSelected, useSlate } from 'slate-react';

import { FloatingMenu } from '../../../components';
import { Trash } from '../../../icons';
import { EventsEditor } from '../../editor-v4-events';
import { removeWebBookmark } from '../transforms';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
}

export const WebBookmarkMenu: FunctionComponent<Props> = ({ containerRef, element }) => {
    const editor = useSlate();
    const isSelected = useSelected();

    const handleRemove = () => {
        const removedElement = removeWebBookmark(editor);

        if (removedElement) {
            EventsEditor.dispatchEvent(editor, 'web-bookmark-removed', { uuid: removedElement.uuid });
        }
    };

    if (!isSelected) {
        return null;
    }

    return (
        <FloatingMenu containerRef={containerRef} element={element}>
            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button
                    onMouseDown={handleRemove}
                    title="Delete bookmark"
                    variant="danger"
                >
                    <FloatingMenu.Icon icon={Trash} />
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>
        </FloatingMenu>
    );
};
