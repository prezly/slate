import type { NewsroomRef } from '@prezly/sdk';
import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { GalleryNode } from '@prezly/slate-types';
import { GALLERY_NODE_TYPE, isGalleryNode } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
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
    onEdited?: (
        editor: Editor,
        gallery: GalleryNode,
        extra: {
            successfulUploads: number;
            failedUploads: Error[];
        },
    ) => void;
    onShuffled?: (editor: Editor, updated: GalleryNode, original: GalleryNode) => void;
    withMediaGalleryTab: false | { enabled: true; newsroom: NewsroomRef };
    withWidthOption: boolean | undefined;
}

export const EXTENSION_ID = 'GalleriesExtension';

export const GalleriesExtension = ({
    availableWidth,
    onEdited,
    onShuffled,
    withMediaGalleryTab,
    withWidthOption = true,
}: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [GALLERY_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        }),
    },
    isElementEqual: (node, another) => {
        if (isGalleryNode(node) && isGalleryNode(another)) {
            return (
                node.layout === another.layout &&
                node.padding === another.padding &&
                node.thumbnail_size === another.thumbnail_size &&
                isEqual(node.images, another.images)
            );
        }
        return undefined;
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
                    withMediaGalleryTab={withMediaGalleryTab}
                    withWidthOption={withWidthOption}
                    element={element}
                    onEdited={onEdited}
                    onShuffled={onShuffled}
                >
                    {children}
                </GalleryElement>
            );
        }

        return undefined;
    },
});
