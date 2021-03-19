import React, { FunctionComponent, RefObject } from 'react';
import { useSelected, useSlate } from 'slate-react';

import { FloatingMenu } from 'components';
import { Trash } from 'icons';
import { EventsEditor } from 'modules/editor-v4-events';

import { removePressContact } from '../lib';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
}

const PressContactMenu: FunctionComponent<Props> = ({ element, containerRef }) => {
    const editor = useSlate();
    const isSelected = useSelected();

    if (!isSelected) {
        return null;
    }

    const handleRemove = () => {
        const removedElement = removePressContact(editor);

        if (removedElement) {
            EventsEditor.dispatchEvent(editor, 'contact-removed', {
                contact_id: removedElement.contact.id,
            });
        }
    };

    return (
        <FloatingMenu containerRef={containerRef} element={element}>
            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button
                    onMouseDown={handleRemove}
                    title="Delete contact"
                    variant="danger"
                >
                    <FloatingMenu.Icon icon={Trash} />
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>
        </FloatingMenu>
    );
};

export default PressContactMenu;
