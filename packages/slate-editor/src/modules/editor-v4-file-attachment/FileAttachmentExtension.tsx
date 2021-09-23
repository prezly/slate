import { isAttachmentNode } from '@prezly/slate-types';
import { createDeserializeElement, Extension } from '@prezly/slate-commons';
import { noop } from 'lodash';
import React from 'react';
import { RenderElementProps } from 'slate-react';

import { FileAttachmentElement, FileAttachmentMenu } from './components';
import { FILE_ATTACHMENT_EXTENSION_ID, FILE_ATTACHMENT_TYPE } from './constants';
import { normalizeRedundantFileAttachmentAttributes, parseSerializedElement } from './lib';
import { FileAttachmentParameters } from './types';

const FileAttachmentExtension = ({
    containerRef,
    onEdit = noop,
    onRemove = noop,
    styled,
}: FileAttachmentParameters): Extension => ({
    deserialize: {
        element: {
            [FILE_ATTACHMENT_TYPE]: createDeserializeElement(parseSerializedElement),
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
    rootTypes: [FILE_ATTACHMENT_TYPE],
    voidTypes: [FILE_ATTACHMENT_TYPE],
});

export default FileAttachmentExtension;
