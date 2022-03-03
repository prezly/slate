import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { ATTACHMENT_NODE_TYPE, isAttachmentNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { noop } from '#lodash';

import { FileAttachmentElement } from './components';
import { FILE_ATTACHMENT_EXTENSION_ID } from './constants';
import { normalizeRedundantFileAttachmentAttributes, parseSerializedElement } from './lib';
import type { FileAttachmentParameters } from './types';

export const FileAttachmentExtension = ({
    containerRef,
    onEdit = noop,
    onRemove = noop,
    styled,
}: FileAttachmentParameters): Extension => ({
    deserialize: {
        element: {
            [ATTACHMENT_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: FILE_ATTACHMENT_EXTENSION_ID,
    normalizers: [normalizeRedundantFileAttachmentAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isAttachmentNode(element)) {
            return (
                <FileAttachmentElement
                    attributes={attributes}
                    element={element}
                    styled={styled}
                    containerRef={containerRef}
                    onEdit={onEdit}
                    onRemove={onRemove}
                >
                    {children}
                </FileAttachmentElement>
            );
        }

        return undefined;
    },
    rootTypes: [ATTACHMENT_NODE_TYPE],
    voidTypes: [ATTACHMENT_NODE_TYPE],
});
