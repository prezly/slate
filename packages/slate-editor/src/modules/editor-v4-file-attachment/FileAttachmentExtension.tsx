import { ATTACHMENT_NODE_TYPE, isAttachmentNode } from '@prezly/slate-types';
import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { noop } from 'lodash';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { FileAttachmentElement, FileAttachmentMenu } from './components';
import { FILE_ATTACHMENT_EXTENSION_ID } from './constants';
import { normalizeRedundantFileAttachmentAttributes, parseSerializedElement } from './lib';
import type { FileAttachmentParameters } from './types';

const FileAttachmentExtension = ({
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
                <>
                    {attributes.ref.current && (
                        <FileAttachmentMenu
                            containerRef={containerRef}
                            element={attributes.ref.current}
                            onEdit={onEdit}
                            onRemove={onRemove}
                        />
                    )}
                    <FileAttachmentElement
                        attributes={attributes}
                        element={element}
                        styled={styled}
                    >
                        {children}
                    </FileAttachmentElement>
                </>
            );
        }

        return undefined;
    },
    rootTypes: [ATTACHMENT_NODE_TYPE],
    voidTypes: [ATTACHMENT_NODE_TYPE],
});

export default FileAttachmentExtension;
