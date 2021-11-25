import type { FunctionComponent, RefObject } from 'react';
import * as React from 'react';
import { useSelected, useSlate } from 'slate-react';

import { FloatingMenu } from '../../../components';
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
        <FloatingMenu containerRef={containerRef} element={element}>
            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button
                    onMouseDown={handleRemove}
                    title="Delete embed"
                    variant="danger"
                >
                    <FloatingMenu.Icon icon={Trash} />
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>
        </FloatingMenu>
    );
};

export default EmbedMenu;
