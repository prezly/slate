import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import { useSelected, useSlate } from 'slate-react';

import { FloatingMenu, Menu } from '../../../components';
import { Trash } from '../../../icons';
import { EventsEditor } from '../../editor-v4-events';
import { removeVideo } from '../transforms';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
}

export const VideoMenu: FunctionComponent<Props> = ({ containerRef, element }) => {
    const editor = useSlate();
    const isSelected = useSelected();

    const handleRemove = () => {
        const removedElement = removeVideo(editor);

        if (removedElement) {
            EventsEditor.dispatchEvent(editor, 'video-removed', { uuid: removedElement.uuid });
        }
    };

    if (!isSelected) {
        return null;
    }

    return (
        <FloatingMenu containerRef={containerRef} element={element}>
            <Menu.ButtonGroup>
                <Menu.Button
                    onMouseDown={handleRemove}
                    title="Delete video"
                    variant="danger"
                >
                    <Menu.Icon icon={Trash} />
                </Menu.Button>
            </Menu.ButtonGroup>
        </FloatingMenu>
    );
};
