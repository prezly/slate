import { AttachmentNode } from '@prezly/slate-types';
import React, { FunctionComponent, RefObject } from 'react';
import { Editor } from 'slate';
import { useSelected, useSlate } from 'slate-react';

import { FloatingMenu } from '../../../components';
import { Edit, Trash } from '../../../icons';
import { removeFileAttachment } from '../transforms';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    onEdit: (editor: Editor) => void;
    onRemove: (editor: Editor, element: AttachmentNode) => void;
}

const FileAttachmentMenu: FunctionComponent<Props> = ({
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

    const handleRemove = () => {
        const removedElement = removeFileAttachment(editor);

        if (removedElement) {
            onRemove(editor, removedElement);
        }
    };

    return (
        <FloatingMenu containerRef={containerRef} element={element}>
            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button onMouseDown={() => onEdit(editor)} title="Edit attachment">
                    <FloatingMenu.Icon icon={Edit} />
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>
            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button
                    onMouseDown={handleRemove}
                    title="Delete attachment"
                    variant="danger"
                >
                    <FloatingMenu.Icon icon={Trash} />
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>
        </FloatingMenu>
    );
};

export default FileAttachmentMenu;
