import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { AttachmentNode } from '@prezly/slate-types';
import { ATTACHMENT_NODE_TYPE, isAttachmentNode } from '@prezly/slate-types';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';
import { noop } from '#lodash';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { FileAttachment, FileAttachmentMenu } from './components';
import { normalizeRedundantFileAttachmentAttributes, parseSerializedElement } from './lib';

export interface Parameters {
    onEdit: (editor: Editor, element: Partial<AttachmentNode>) => void;
    onRemove?: (editor: Editor, element: AttachmentNode) => void;
}

export const EXTENSION_ID = 'FileAttachmentExtension';

export const FileAttachmentExtension = ({
    onEdit = noop,
    onRemove = noop,
}: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [ATTACHMENT_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        }),
    },
    isRichBlock: isAttachmentNode,
    isVoid: isAttachmentNode,
    normalizeNode: normalizeRedundantFileAttachmentAttributes,
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isAttachmentNode(element)) {
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

        return undefined;
    },
});
