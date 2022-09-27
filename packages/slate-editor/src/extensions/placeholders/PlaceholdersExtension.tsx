import type { NewsroomRef, OEmbedInfo } from '@prezly/sdk';
import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import {
    AttachmentPlaceholderElement,
    EmbedPlaceholderElement,
    GalleryPlaceholderElement,
    ImagePlaceholderElement,
    SocialPostPlaceholderElement,
    VideoPlaceholderElement,
    WebBookmarkPlaceholderElement,
} from './elements';
import { fixDuplicatePlaceholderUuid } from './normalization';
import { PlaceholderNode } from './PlaceholderNode';
import type { FetchOEmbedFn } from './types';

export const EXTENSION_ID = 'PlaceholdersExtension';

const isPlaceholderNode = PlaceholderNode.isPlaceholderNode;

export interface Parameters {
    fetchOembed?: FetchOEmbedFn | undefined;
    newsroom?: NewsroomRef | undefined;
    withCaptions?: boolean | undefined;
}

export function PlaceholdersExtension({
    fetchOembed = failFetching,
    newsroom,
    withCaptions = false,
}: Parameters = {}): Extension {
    return {
        id: EXTENSION_ID,
        isRichBlock: PlaceholderNode.isPlaceholderNode,
        isVoid: PlaceholderNode.isPlaceholderNode,
        normalizeNode: fixDuplicatePlaceholderUuid,
        renderElement({ element, children, attributes }) {
            if (isPlaceholderNode(element, PlaceholderNode.Type.ATTACHMENT)) {
                return (
                    <AttachmentPlaceholderElement attributes={attributes} element={element}>
                        {children}
                    </AttachmentPlaceholderElement>
                );
            }
            if (isPlaceholderNode(element, PlaceholderNode.Type.EMBED)) {
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
            if (isPlaceholderNode(element, PlaceholderNode.Type.IMAGE)) {
                return (
                    <ImagePlaceholderElement
                        attributes={attributes}
                        element={element}
                        newsroom={newsroom}
                        withCaptions={withCaptions}
                    >
                        {children}
                    </ImagePlaceholderElement>
                );
            }
            if (isPlaceholderNode(element, PlaceholderNode.Type.GALLERY)) {
                return (
                    <GalleryPlaceholderElement
                        attributes={attributes}
                        element={element}
                        newsroom={newsroom}
                        withCaptions={withCaptions}
                    >
                        {children}
                    </GalleryPlaceholderElement>
                );
            }
            if (isPlaceholderNode(element, PlaceholderNode.Type.SOCIAL_POST)) {
                return (
                    <SocialPostPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={fetchOembed}
                    >
                        {children}
                    </SocialPostPlaceholderElement>
                );
            }
            if (isPlaceholderNode(element, PlaceholderNode.Type.VIDEO)) {
                return (
                    <VideoPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={fetchOembed}
                    >
                        {children}
                    </VideoPlaceholderElement>
                );
            }
            if (isPlaceholderNode(element, PlaceholderNode.Type.WEB_BOOKMARK)) {
                return (
                    <WebBookmarkPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={fetchOembed}
                    >
                        {children}
                    </WebBookmarkPlaceholderElement>
                );
            }
            return undefined;
        },
    };
}

function failFetching(): Promise<OEmbedInfo> {
    return Promise.reject(new Error('Embeds are not enabled'));
}
