import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import type { AttachmentNode } from '@prezly/slate-types';
import { ATTACHMENT_NODE_TYPE, isAttachmentNode } from '@prezly/slate-types';
import { isEqual, noop } from '@technically/lodash';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { FileAttachment, FileAttachmentMenu } from './components';
import { normalizeRedundantFileAttachmentAttributes, parseSerializedElement } from './lib';

export interface Parameters {
    onEdited?: (editor: Editor, updated: AttachmentNode) => void;
    onRemoved?: (editor: Editor, element: AttachmentNode) => void;
}

export const EXTENSION_ID = 'FileAttachmentExtension';

export function FileAttachmentExtension({ onEdited = noop, onRemoved = noop }: Parameters) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [ATTACHMENT_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            }),
        },
        isElementEqual: (node, another) => {
            if (isAttachmentNode(node) && isAttachmentNode(another)) {
                // Compare ignoring `uuid`
                return node.description === another.description && isEqual(node.file, another.file);
            }
            return undefined;
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
                        // We have to render children or Slate will fail when trying to find the node.
                        renderAboveFrame={children}
                        renderReadOnlyFrame={() => <FileAttachment element={element} />}
                        renderMenu={({ onClose }) => (
                            <FileAttachmentMenu
                                element={element}
                                onEdited={onEdited}
                                onRemoved={onRemoved}
                                onClose={onClose}
                            />
                        )}
                        rounded
                        void
                    />
                );
            }

            return undefined;
        },
    });
}
