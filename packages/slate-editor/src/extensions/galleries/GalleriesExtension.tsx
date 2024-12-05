import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { GalleryLayout, GalleryNode, GalleryPadding } from '@prezly/slate-types';
import { GALLERY_NODE_TYPE, isGalleryNode } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';
import React from 'react';
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
        editor: SlateEditor,
        gallery: GalleryNode,
        extra: {
            successfulUploads: number;
            failedUploads: Error[];
        },
    ) => void;
    onImageCaptionClicked?: (editor: SlateEditor) => void;
    onImageCropClicked?: (editor: SlateEditor) => void;
    onImageDeleteClicked?: (editor: SlateEditor) => void;
    onLayoutChanged?: (editor: SlateEditor, layout: GalleryLayout) => void;
    onPaddingChanged?: (editor: SlateEditor, padding: GalleryPadding) => void;
    onReordered?: (editor: SlateEditor, gallery: GalleryNode) => void;
    onShuffled?: (editor: SlateEditor, updated: GalleryNode, original: GalleryNode) => void;
    onThumbnailSizeChanged?: (
        editor: SlateEditor,
        thumbnail_size: GalleryNode['thumbnail_size'],
    ) => void;
}

export const EXTENSION_ID = 'GalleriesExtension';

export const GalleriesExtension = ({
    availableWidth,
    onAdded,
    onImageCaptionClicked,
    onImageCropClicked,
    onImageDeleteClicked,
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
                    onImageCaptionClicked={onImageCaptionClicked}
                    onImageCropClicked={onImageCropClicked}
                    onImageDeleteClicked={onImageDeleteClicked}
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
