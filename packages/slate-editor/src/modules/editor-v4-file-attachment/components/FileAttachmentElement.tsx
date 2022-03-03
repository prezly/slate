import type { AttachmentNode } from '@prezly/slate-types';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import { FileAttachment } from './FileAttachment';
import { FileAttachmentMenu } from './FileAttachmentMenu';

interface FileAttachmentElementProps extends RenderElementProps {
    element: AttachmentNode;
    styled: boolean;

    containerRef: React.RefObject<HTMLElement>;
    onEdit: (editor: Editor) => void;
    onRemove: (editor: Editor, element: AttachmentNode) => void;
}

export function FileAttachmentElement({
    element,
    attributes,
    containerRef,
    onEdit,
    onRemove,
    children,
    styled,
}: FileAttachmentElementProps) {
    return (
        <EditorBlock
            {...attributes}
            element={element}
            renderBlock={() => <FileAttachment styled={styled} element={element} />}
            renderMenu={() => (
                <FileAttachmentMenu
                    containerRef={containerRef}
                    element={attributes.ref.current}
                    onEdit={onEdit}
                    onRemove={onRemove}
                />
            )}
            void
        >
            {children}
        </EditorBlock>
    );
}
