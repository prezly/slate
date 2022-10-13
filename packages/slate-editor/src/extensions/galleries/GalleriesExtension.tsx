import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { GALLERY_NODE_TYPE, isGalleryNode } from '@prezly/slate-types';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { GalleryElement } from './components';
import {
    normalizeInvalidGallery,
    normalizeRedundantGalleryAttributes,
    parseSerializedElement,
} from './lib';

interface Parameters {
    availableWidth: number;
    onEdit: (editor: Editor) => void;
    withWidthOption: boolean | undefined;
}

export const EXTENSION_ID = 'GalleriesExtension';

export const GalleriesExtension = ({
    availableWidth,
    onEdit,
    withWidthOption = true,
}: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [GALLERY_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        }),
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
                    withWidthOption={withWidthOption}
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
