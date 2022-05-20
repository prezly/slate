import type { AttachmentNode } from '@prezly/slate-types';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import { FileAttachment } from './FileAttachment';
import { FileAttachmentMenu } from './FileAttachmentMenu';

interface Props extends RenderElementProps {
    element: AttachmentNode;
    onEdit: (editor: Editor, element: Partial<AttachmentNode>) => void;
    onRemove: (editor: Editor, element: AttachmentNode) => void;
}

export function FileAttachmentElement({ element, attributes, onEdit, onRemove, children }: Props) {
    return (
        <EditorBlock
            {...attributes}
            border
            element={element}
            renderBlock={() => <FileAttachment element={element} />}
            renderMenu={({ onClose }) => (
                <FileAttachmentMenu
                    element={element}
                    onEdit={onEdit}
                    onRemove={onRemove}
                    onClose={onClose}
                />
            )}
            rounded
            void
        >
            {children}
        </EditorBlock>
    );
}
