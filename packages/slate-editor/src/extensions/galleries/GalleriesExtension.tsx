import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { GalleryImage, GalleryLayout, GalleryNode, GalleryPadding } from '@prezly/slate-types';
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
import type { GalleriesExtensionConfiguration } from './types';

interface Parameters extends GalleriesExtensionConfiguration {
    availableWidth: number;
    onAdded?: (
        editor: Editor,
        gallery: GalleryNode,
        extra: {
            successfulUploads: number;
            failedUploads: Error[];
        },
    ) => void;
    onImageCrop?: (editor: Editor, image: GalleryImage) => void;
    onImageDeleted?: (editor: Editor, image: GalleryImage) => void;
    onImageEditCaption?: (editor: Editor, image: GalleryImage) => void;
    onLayoutChanged?: (editor: Editor, layout: GalleryLayout) => void;
    onPaddingChanged?: (editor: Editor, padding: GalleryPadding) => void;
    onReordered?: (editor: Editor, gallery: GalleryNode) => void;
    onShuffled?: (editor: Editor, updated: GalleryNode, original: GalleryNode) => void;
    onThumbnailSizeChanged?: (
        editor: Editor,
        thumbnail_size: GalleryNode['thumbnail_size'],
    ) => void;
}

export const EXTENSION_ID = 'GalleriesExtension';

export const GalleriesExtension = ({
    availableWidth,
    onAdded,
    onImageCrop,
    onImageDeleted,
    onImageEditCaption,
    onLayoutChanged,
    onPaddingChanged,
    onReordered,
    onShuffled,
    onThumbnailSizeChanged,
    withLayoutOptions = false,
    withMediaGalleryTab = false,
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
                    withLayoutOptions={withLayoutOptions}
                    element={element}
                    onAdded={onAdded}
                    onImageCrop={onImageCrop}
                    onImageDeleted={onImageDeleted}
                    onImageEditCaption={onImageEditCaption}
                    onLayoutChanged={onLayoutChanged}
                    onPaddingChanged={onPaddingChanged}
                    onReordered={onReordered}
                    onShuffled={onShuffled}
                    onThumbnailSizeChanged={onThumbnailSizeChanged}
                >
                    {children}
                </GalleryElement>
            );
        }

        return undefined;
    },
});
