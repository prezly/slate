import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import {
    AttachmentPlaceholderElement,
    GalleryPlaceholderElement,
    ImagePlaceholderElement,
} from './elements';
import { fixDuplicatePlaceholderUuid } from './normalization';
import { PlaceholderNode } from './PlaceholderNode';

export const EXTENSION_ID = 'PlaceholdersExtension';

const isPlaceholderNode = PlaceholderNode.isPlaceholderNode;
const Type = PlaceholderNode.Type;

export function PlaceholdersExtension(): Extension {
    return {
        id: EXTENSION_ID,
        isRichBlock: PlaceholderNode.isPlaceholderNode,
        isVoid: PlaceholderNode.isPlaceholderNode,
        normalizeNode: fixDuplicatePlaceholderUuid,
        renderElement({ element, children, attributes }) {
            if (isPlaceholderNode(element, Type.ATTACHMENT)) {
                return (
                    <AttachmentPlaceholderElement attributes={attributes} element={element}>
                        {children}
                    </AttachmentPlaceholderElement>
                );
            }
            if (isPlaceholderNode(element, Type.IMAGE)) {
                return (
                    <ImagePlaceholderElement attributes={attributes} element={element}>
                        {children}
                    </ImagePlaceholderElement>
                );
            }
            if (isPlaceholderNode(element, Type.GALLERY)) {
                return (
                    <GalleryPlaceholderElement attributes={attributes} element={element}>
                        {children}
                    </GalleryPlaceholderElement>
                );
            }
            return undefined;
        },
    };
}
