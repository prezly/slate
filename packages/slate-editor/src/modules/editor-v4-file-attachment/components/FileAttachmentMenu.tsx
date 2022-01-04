import type { AttachmentNode } from '@prezly/slate-types';
import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import type { Editor } from 'slate';
import { useSelected, useSlate } from 'slate-react';

import { Menu } from '#components';
import { Delete, Edit } from '#icons';

import { removeFileAttachment } from '../transforms';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    onEdit: (editor: Editor) => void;
    onRemove: (editor: Editor, element: AttachmentNode) => void;
}

export const FileAttachmentMenu: FunctionComponent<Props> = ({
    element,
    containerRef,
    onEdit,
    onRemove,
}) => {
    const editor = useSlate();
    const isSelected = useSelected();

    if (!isSelected) {
        return null;
    }

    function handleRemove() {
        const removedElement = removeFileAttachment(editor);

        if (removedElement) {
            onRemove(editor, removedElement);
        }
    }

    return (
        <Menu.FloatingMenu containerRef={containerRef} element={element}>
            <Menu.ButtonGroup>
                <Menu.Button onMouseDown={() => onEdit(editor)} title="Edit attachment">
                    <Menu.Icon icon={Edit} />
                </Menu.Button>
            </Menu.ButtonGroup>
            <Menu.ButtonGroup>
                <Menu.Button onMouseDown={handleRemove} title="Delete attachment" variant="danger">
                    <Menu.Icon icon={Delete} />
                </Menu.Button>
            </Menu.ButtonGroup>
        </Menu.FloatingMenu>
    );
};
