import type { NewsroomRef } from '@prezly/sdk';
import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import { CoveragePlaceholderElement, InlineContactPlaceholderElement } from './elements';
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
import type { FetchOEmbedFn, FrameProps } from './types';

export const EXTENSION_ID = 'PlaceholdersExtension';

const isPlaceholderNode = PlaceholderNode.isPlaceholderNode;

export interface Parameters {
    removable?: boolean;
    withAttachmentPlaceholders?: boolean;
    withContactPlaceholders?:
        | false
        | Pick<
              ContactPlaceholderElement.Props,
              'getSuggestions' | 'renderEmpty' | 'renderSuggestion' | 'renderSuggestionsFooter'
          >;
    withCoveragePlaceholders?:
        | false
        | Pick<
              CoveragePlaceholderElement.Props,
              | 'getSuggestions'
              | 'renderEmpty'
              | 'renderSuggestion'
              | 'renderSuggestionsFooter'
              | 'onCreateCoverage'
          >;
    withEmbedPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
    withGalleryPlaceholders?: boolean | { newsroom?: NewsroomRef };
    withImagePlaceholders?: boolean | { withCaptions: boolean; newsroom?: NewsroomRef };
    withInlineContactPlaceholders?:
        | false
        | Pick<
              InlineContactPlaceholderElement.Props,
              'getSuggestions' | 'renderEmpty' | 'renderSuggestion' | 'renderSuggestionsFooter'
          >;
    withSocialPostPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
    withVideoPlaceholders?: false | { fetchOembed: FetchOEmbedFn; format?: FrameProps['format'] };
    withWebBookmarkPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
}

export function PlaceholdersExtension({
    withAttachmentPlaceholders = false,
    withContactPlaceholders = false,
    withCoveragePlaceholders = false,
    withEmbedPlaceholders = false,
    withGalleryPlaceholders = false,
    withImagePlaceholders = false,
    withInlineContactPlaceholders = false,
    withSocialPostPlaceholders = false,
    withWebBookmarkPlaceholders = false,
    withVideoPlaceholders = false,
    ...parameters
}: Parameters = {}): Extension {
    const removable = parameters.removable ?? true;

    return {
        id: EXTENSION_ID,
        isRichBlock: PlaceholderNode.isPlaceholderNode,
        isVoid: PlaceholderNode.isPlaceholderNode,
        normalizeNode: [
            fixDuplicatePlaceholderUuid,
            removeDisabledPlaceholders({
                withAttachmentPlaceholders: Boolean(withAttachmentPlaceholders),
                withContactPlaceholders: Boolean(withContactPlaceholders),
                withCoveragePlaceholders: Boolean(withCoveragePlaceholders),
                withEmbedPlaceholders: Boolean(withEmbedPlaceholders),
                withGalleryPlaceholders: Boolean(withGalleryPlaceholders),
                withImagePlaceholders: Boolean(withImagePlaceholders),
                withInlineContactPlaceholders: Boolean(withInlineContactPlaceholders),
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
                    <AttachmentPlaceholderElement
                        attributes={attributes}
                        element={element}
                        removable={removable}
                    >
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
                        removable={removable}
                    >
                        {children}
                    </ContactPlaceholderElement>
                );
            }
            if (
                withInlineContactPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.CONTACT)
            ) {
                return (
                    <InlineContactPlaceholderElement
                        {...withInlineContactPlaceholders}
                        attributes={attributes}
                        element={element}
                        removable={removable}
                    >
                        {children}
                    </InlineContactPlaceholderElement>
                );
            }
            if (
                withCoveragePlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.COVERAGE)
            ) {
                return (
                    <CoveragePlaceholderElement
                        {...withCoveragePlaceholders}
                        attributes={attributes}
                        element={element}
                        removable={removable}
                    >
                        {children}
                    </CoveragePlaceholderElement>
                );
            }
            if (withEmbedPlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.EMBED)) {
                return (
                    <EmbedPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={withEmbedPlaceholders.fetchOembed}
                        removable={removable}
                    >
                        {children}
                    </EmbedPlaceholderElement>
                );
            }
            if (withImagePlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.IMAGE)) {
                const { newsroom = undefined, withCaptions = false } =
                    withImagePlaceholders === true ? {} : withImagePlaceholders;

                return (
                    <ImagePlaceholderElement
                        attributes={attributes}
                        element={element}
                        newsroom={newsroom}
                        withCaptions={withCaptions}
                        removable={removable}
                    >
                        {children}
                    </ImagePlaceholderElement>
                );
            }
            if (
                withGalleryPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.GALLERY)
            ) {
                const { newsroom = undefined } =
                    withGalleryPlaceholders === true ? {} : withGalleryPlaceholders;
                return (
                    <GalleryPlaceholderElement
                        attributes={attributes}
                        element={element}
                        newsroom={newsroom}
                        withCaptions
                        removable={removable}
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
                        removable={removable}
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
                        format={withVideoPlaceholders.format}
                        removable={removable}
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
                        removable={removable}
                    >
                        {children}
                    </WebBookmarkPlaceholderElement>
                );
            }
            return undefined;
        },
    };
}
