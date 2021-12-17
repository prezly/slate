import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import { useSelected, useSlate } from 'slate-react';

import { Menu } from '../../../components';
import { Trash } from '../../../icons';
import { EventsEditor } from '../../../modules/editor-v4-events';
import { removeEmbed } from '../transforms';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
}

const EmbedMenu: FunctionComponent<Props> = ({ containerRef, element }) => {
    const editor = useSlate();
    const isSelected = useSelected();

    const handleRemove = () => {
        const removedElement = removeEmbed(editor);

        if (removedElement) {
            EventsEditor.dispatchEvent(editor, 'embed-removed', { uuid: removedElement.uuid });
        }
    };

    if (!isSelected) {
        return null;
    }

    return (
        <Menu.FloatingMenu containerRef={containerRef} element={element}>
            <Menu.ButtonGroup>
                <Menu.Button
                    onMouseDown={handleRemove}
                    title="Delete embed"
                    variant="danger"
                >
                    <Menu.Icon icon={Trash} />
                </Menu.Button>
            </Menu.ButtonGroup>
        </Menu.FloatingMenu>
    );
};

export default EmbedMenu;
