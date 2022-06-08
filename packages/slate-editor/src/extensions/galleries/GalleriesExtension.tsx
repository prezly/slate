import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { GALLERY_NODE_TYPE, isGalleryNode } from '@prezly/slate-types';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { GalleryElement } from './components';
import {
    normalizeInvalidGallery,
    normalizeRedundantGalleryAttributes,
    parseSerializedElement,
} from './lib';

interface Parameters {
    availableWidth: number;
    onEdit: (editor: Editor) => void;
}

export const EXTENSION_ID = 'GalleriesExtension';

export const GalleriesExtension = ({ availableWidth, onEdit }: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: {
            [GALLERY_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    isRichBlock: isGalleryNode,
    isVoid: isGalleryNode,
    normalizeNode: [normalizeInvalidGallery, normalizeRedundantGalleryAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isGalleryNode(element)) {
            return (
                <GalleryElement
                    attributes={attributes}
                    availableWidth={availableWidth}
                    element={element}
                    onEdit={onEdit}
                >
                    {children}
                </GalleryElement>
            );
        }

        return undefined;
    },
});
