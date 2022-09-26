import type { OEmbedInfo } from '@prezly/sdk';
import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import {
    AttachmentPlaceholderElement,
    EmbedPlaceholderElement,
    GalleryPlaceholderElement,
    ImagePlaceholderElement,
} from './elements';
import { fixDuplicatePlaceholderUuid } from './normalization';
import { PlaceholderNode } from './PlaceholderNode';
import type { FetchOEmbedFn } from './types';

export const EXTENSION_ID = 'PlaceholdersExtension';

const isPlaceholderNode = PlaceholderNode.isPlaceholderNode;
const Type = PlaceholderNode.Type;

export interface Parameters {
    fetchOembed?: FetchOEmbedFn;
}

export function PlaceholdersExtension({ fetchOembed = failFetching }: Parameters = {}): Extension {
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
            if (isPlaceholderNode(element, Type.EMBED)) {
                return (
                    <EmbedPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={fetchOembed}
                    >
                        {children}
                    </EmbedPlaceholderElement>
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

function failFetching(): Promise<OEmbedInfo> {
    return Promise.reject(new Error('Embeds are not enabled'));
}
