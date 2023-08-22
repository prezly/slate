import type { NewsroomRef } from '@prezly/sdk';
import type { Extension } from '@prezly/slate-commons';
import React from 'react';

import { StoryEmbedPlaceholderElement } from './elements';
import {
    CoveragePlaceholderElement,
    InlineContactPlaceholderElement,
    StoryBookmarkPlaceholderElement,
} from './elements';
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
import { MediaPlaceholderElement } from './elements/MediaPlaceholderElement';
import {
    fixDuplicatePlaceholderUuid,
    normalizeAttributes,
    removeDisabledPlaceholders,
} from './normalization';
import { PlaceholderNode } from './PlaceholderNode';
import type { FetchOEmbedFn, FrameProps, RemovableFlagConfig } from './types';

export const EXTENSION_ID = 'PlaceholdersExtension';

const isPlaceholderNode = PlaceholderNode.isPlaceholderNode;

export interface Parameters {
    format?: FrameProps['format'];
    removable?: RemovableFlagConfig;
    withAttachmentPlaceholders?: boolean;
    withContactPlaceholders?:
        | false
        | Pick<
              ContactPlaceholderElement.Props,
              | 'getSuggestions'
              | 'invalidateSuggestions'
              | 'renderAddon'
              | 'renderEmpty'
              | 'renderSuggestion'
              | 'renderSuggestionsFooter'
          >;
    withCoveragePlaceholders?:
        | false
        | Pick<
              CoveragePlaceholderElement.Props,
              | 'getSuggestions'
              | 'invalidateSuggestions'
              | 'renderEmpty'
              | 'renderSuggestion'
              | 'renderSuggestionsFooter'
              | 'onCreateCoverage'
          >;
    withEmbedPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
    withGalleryPlaceholders?: boolean | { newsroom: NewsroomRef | undefined };
    withImagePlaceholders?: boolean | { withCaptions: boolean; newsroom: NewsroomRef | undefined };
    withInlineContactPlaceholders?:
        | false
        | Pick<
              InlineContactPlaceholderElement.Props,
              | 'getSuggestions'
              | 'invalidateSuggestions'
              | 'renderEmpty'
              | 'renderSuggestion'
              | 'renderSuggestionsFooter'
          >;
    withMediaPlaceholders?: boolean | { withCaptions: boolean; newsroom: NewsroomRef | undefined };
    withStoryBookmarkPlaceholders?:
        | false
        | Pick<
              StoryBookmarkPlaceholderElement.Props,
              | 'getSuggestions'
              | 'invalidateSuggestions'
              | 'renderAddon'
              | 'renderEmpty'
              | 'renderSuggestion'
              | 'renderSuggestionsFooter'
          >;
    withStoryEmbedPlaceholders?:
        | false
        | Pick<
              StoryEmbedPlaceholderElement.Props,
              | 'getSuggestions'
              | 'invalidateSuggestions'
              | 'renderAddon'
              | 'renderEmpty'
              | 'renderSuggestion'
              | 'renderSuggestionsFooter'
          >;
    withSocialPostPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
    withVideoPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
    withWebBookmarkPlaceholders?: false | { fetchOembed: FetchOEmbedFn };
}

export function PlaceholdersExtension({
    format = undefined,
    removable = false,
    withAttachmentPlaceholders = false,
    withContactPlaceholders = false,
    withCoveragePlaceholders = false,
    withEmbedPlaceholders = false,
    withGalleryPlaceholders = false,
    withImagePlaceholders = false,
    withInlineContactPlaceholders = false,
    withMediaPlaceholders = false,
    withStoryBookmarkPlaceholders = false,
    withStoryEmbedPlaceholders = false,
    withSocialPostPlaceholders = false,
    withWebBookmarkPlaceholders = false,
    withVideoPlaceholders = false,
}: Parameters = {}): Extension {
    return {
        id: EXTENSION_ID,
        isElementEqual(element, another) {
            if (isPlaceholderNode(element) && isPlaceholderNode(another)) {
                // Consider placeholders equal, if they are of the same type
                // ignoring `uuid`
                return element.type === another.type;
            }
            return undefined;
        },
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
                withMediaPlaceholders: Boolean(withMediaPlaceholders),
                withSocialPostPlaceholders: Boolean(withSocialPostPlaceholders),
                withStoryBookmarkPlaceholders: Boolean(withStoryBookmarkPlaceholders),
                withStoryEmbedPlaceholders: Boolean(withStoryEmbedPlaceholders),
                withWebBookmarkPlaceholders: Boolean(withWebBookmarkPlaceholders),
                withVideoPlaceholders: Boolean(withVideoPlaceholders),
            }),
            normalizeAttributes,
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
                        format={format}
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
                        format={format}
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
                        format={format}
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
                        format={format}
                        removable={removable}
                    >
                        {children}
                    </CoveragePlaceholderElement>
                );
            }
            if (withEmbedPlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.EMBED)) {
                if (element.provider === PlaceholderNode.Provider.INSTAGRAM) {
                    return (
                        <EmbedPlaceholderElement
                            attributes={attributes}
                            element={element}
                            fetchOembed={withEmbedPlaceholders.fetchOembed}
                            format={format}
                            removable={removable}
                        >
                            {children}
                        </EmbedPlaceholderElement>
                    );
                }

                return (
                    <EmbedPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={withEmbedPlaceholders.fetchOembed}
                        format={format}
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
                        format={format}
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
                        format={format}
                        newsroom={newsroom}
                        withCaptions
                        removable={removable}
                    >
                        {children}
                    </GalleryPlaceholderElement>
                );
            }
            if (withMediaPlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.MEDIA)) {
                const { newsroom = undefined, withCaptions = false } =
                    withMediaPlaceholders === true ? {} : withMediaPlaceholders;

                return (
                    <MediaPlaceholderElement
                        attributes={attributes}
                        element={element}
                        format={format}
                        newsroom={newsroom}
                        withCaptions={withCaptions}
                        removable={removable}
                    >
                        {children}
                    </MediaPlaceholderElement>
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
                        format={format}
                        removable={removable}
                    >
                        {children}
                    </SocialPostPlaceholderElement>
                );
            }
            if (
                withStoryBookmarkPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.STORY_BOOKMARK)
            ) {
                return (
                    <StoryBookmarkPlaceholderElement
                        {...withStoryBookmarkPlaceholders}
                        attributes={attributes}
                        element={element}
                        format={format}
                        removable={removable}
                    >
                        {children}
                    </StoryBookmarkPlaceholderElement>
                );
            }
            if (
                withStoryEmbedPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.STORY_EMBED)
            ) {
                return (
                    <StoryEmbedPlaceholderElement
                        {...withStoryEmbedPlaceholders}
                        attributes={attributes}
                        element={element}
                        format={format}
                        removable={removable}
                    >
                        {children}
                    </StoryEmbedPlaceholderElement>
                );
            }
            if (withVideoPlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.VIDEO)) {
                if (element.provider === PlaceholderNode.Provider.YOUTUBE) {
                    return (
                        <VideoPlaceholderElement
                            attributes={attributes}
                            element={element}
                            fetchOembed={withVideoPlaceholders.fetchOembed}
                            format={format}
                            removable={removable}
                        >
                            {children}
                        </VideoPlaceholderElement>
                    );
                }

                return (
                    <VideoPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={withVideoPlaceholders.fetchOembed}
                        format={format}
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
                        format={format}
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
