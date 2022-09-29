import type { NewsroomRef } from '@prezly/sdk';
import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import {
    AttachmentPlaceholderElement,
    ContactPlaceholderElement,
    EmbedPlaceholderElement,
    GalleryPlaceholderElement,
    ImagePlaceholderElement,
    SocialPostPlaceholderElement,
    VideoPlaceholderElement,
    WebBookmarkPlaceholderElement,
} from './elements';
import { fixDuplicatePlaceholderUuid, removeDisabledPlaceholders } from './normalization';
import { PlaceholderNode } from './PlaceholderNode';
import type { FetchOEmbedFn } from './types';

export const EXTENSION_ID = 'PlaceholdersExtension';

const isPlaceholderNode = PlaceholderNode.isPlaceholderNode;

export interface Parameters {
    withAttachmentPlaceholders?: boolean;
    withContactPlaceholders?:
        | false
        | Pick<
              ContactPlaceholderElement.Props,
              'getSuggestions' | 'renderEmpty' | 'renderSuggestion' | 'renderSuggestions'
          >;
    withEmbedPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
    withGalleryPlaceholders?: false | { newsroom?: NewsroomRef };
    withImagePlaceholders?: false | { withCaptions: boolean; newsroom?: NewsroomRef };
    withSocialPostPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
    withVideoPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
    withWebBookmarkPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
}

export function PlaceholdersExtension({
    withAttachmentPlaceholders = false,
    withContactPlaceholders = false,
    withEmbedPlaceholders = false,
    withGalleryPlaceholders = false,
    withImagePlaceholders = false,
    withSocialPostPlaceholders = false,
    withWebBookmarkPlaceholders = false,
    withVideoPlaceholders = false,
}: Parameters = {}): Extension {
    return {
        id: EXTENSION_ID,
        isRichBlock: PlaceholderNode.isPlaceholderNode,
        isVoid: PlaceholderNode.isPlaceholderNode,
        normalizeNode: [
            fixDuplicatePlaceholderUuid,
            removeDisabledPlaceholders({
                withAttachmentPlaceholders: Boolean(withAttachmentPlaceholders),
                withContactPlaceholders: Boolean(withContactPlaceholders),
                withEmbedPlaceholders: Boolean(withEmbedPlaceholders),
                withGalleryPlaceholders: Boolean(withGalleryPlaceholders),
                withImagePlaceholders: Boolean(withImagePlaceholders),
                withSocialPostPlaceholders: Boolean(withSocialPostPlaceholders),
                withWebBookmarkPlaceholders: Boolean(withWebBookmarkPlaceholders),
                withVideoPlaceholders: Boolean(withVideoPlaceholders),
            }),
        ],
        renderElement({ element, children, attributes }) {
            if (
                withAttachmentPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.ATTACHMENT)
            ) {
                return (
                    <AttachmentPlaceholderElement attributes={attributes} element={element}>
                        {children}
                    </AttachmentPlaceholderElement>
                );
            }
            if (
                withContactPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.CONTACT)
            ) {
                return (
                    <ContactPlaceholderElement
                        {...withContactPlaceholders}
                        attributes={attributes}
                        element={element}
                    >
                        {children}
                    </ContactPlaceholderElement>
                );
            }
            if (withEmbedPlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.EMBED)) {
                return (
                    <EmbedPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={withEmbedPlaceholders.fetchOembed}
                    >
                        {children}
                    </EmbedPlaceholderElement>
                );
            }
            if (withImagePlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.IMAGE)) {
                return (
                    <ImagePlaceholderElement
                        attributes={attributes}
                        element={element}
                        newsroom={withImagePlaceholders.newsroom}
                        withCaptions={withImagePlaceholders.withCaptions}
                    >
                        {children}
                    </ImagePlaceholderElement>
                );
            }
            if (
                withGalleryPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.GALLERY)
            ) {
                return (
                    <GalleryPlaceholderElement
                        attributes={attributes}
                        element={element}
                        newsroom={withGalleryPlaceholders.newsroom}
                        withCaptions
                    >
                        {children}
                    </GalleryPlaceholderElement>
                );
            }
            if (
                withSocialPostPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.SOCIAL_POST)
            ) {
                return (
                    <SocialPostPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={withSocialPostPlaceholders.fetchOembed}
                    >
                        {children}
                    </SocialPostPlaceholderElement>
                );
            }
            if (withVideoPlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.VIDEO)) {
                return (
                    <VideoPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={withVideoPlaceholders.fetchOembed}
                    >
                        {children}
                    </VideoPlaceholderElement>
                );
            }
            if (
                withWebBookmarkPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.WEB_BOOKMARK)
            ) {
                return (
                    <WebBookmarkPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={withWebBookmarkPlaceholders.fetchOembed}
                    >
                        {children}
                    </WebBookmarkPlaceholderElement>
                );
            }
            return undefined;
        },
    };
}
