import type { Extension } from '@prezly/slate-commons';
import React from 'react';
import type { Editor } from 'slate';

import { withPastedUrlsUnfurling } from './behaviour';
import { GalleryBookmarkPlaceholderElement } from './elements';
import {
    AttachmentPlaceholderElement,
    ContactPlaceholderElement,
    CoveragePlaceholderElement,
    EmbedPlaceholderElement,
    GalleryPlaceholderElement,
    ImagePlaceholderElement,
    InlineContactPlaceholderElement,
    SocialPostPlaceholderElement,
    StoryBookmarkPlaceholderElement,
    StoryEmbedPlaceholderElement,
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
import type { FetchOEmbedFn, FrameProps, RemovableFlagConfig, WithMediaGalleryTab } from './types';

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
    withGalleryPlaceholders?: boolean | { withMediaGalleryTab: WithMediaGalleryTab };
    withGalleryBookmarkPlaceholders?:
        | false
        | Pick<GalleryBookmarkPlaceholderElement.Props, 'renderPlaceholder'>;
    withImagePlaceholders?:
        | boolean
        | { withCaptions: boolean; withMediaGalleryTab: WithMediaGalleryTab };
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
    withMediaPlaceholders?:
        | boolean
        | { withCaptions: boolean; withMediaGalleryTab: WithMediaGalleryTab };
    withStoryBookmarkPlaceholders?:
        | false
        | Pick<StoryBookmarkPlaceholderElement.Props, 'renderPlaceholder'>;
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
    withPastedUrlsUnfurling?:
        | false
        | { fetchOembed: FetchOEmbedFn; isAllowed?(editor: Editor, url: string): boolean };
}

export function PlaceholdersExtension({
    format = undefined,
    removable = false,
    withAttachmentPlaceholders = false,
    withContactPlaceholders = false,
    withCoveragePlaceholders = false,
    withEmbedPlaceholders = false,
    withGalleryPlaceholders = false,
    withGalleryBookmarkPlaceholders = false,
    withImagePlaceholders = false,
    withInlineContactPlaceholders = false,
    withMediaPlaceholders = false,
    withStoryBookmarkPlaceholders = false,
    withStoryEmbedPlaceholders = false,
    withSocialPostPlaceholders = false,
    withPastedUrlsUnfurling: isUnfurlingPastedUrls = false,
    withVideoPlaceholders = false,
    withWebBookmarkPlaceholders = false,
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
                withGalleryBookmarkPlaceholders: Boolean(withGalleryBookmarkPlaceholders),
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
                return (
                    <EmbedPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={withEmbedPlaceholders.fetchOembed}
                        format={format}
                        removable={removable}
                        withImagePlaceholders={Boolean(withImagePlaceholders)}
                        withVideoPlaceholders={Boolean(withVideoPlaceholders)}
                        withWebBookmarkPlaceholders={Boolean(withWebBookmarkPlaceholders)}
                    >
                        {children}
                    </EmbedPlaceholderElement>
                );
            }
            if (withImagePlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.IMAGE)) {
                const { withMediaGalleryTab = false, withCaptions = false } =
                    withImagePlaceholders === true ? {} : withImagePlaceholders;

                return (
                    <ImagePlaceholderElement
                        attributes={attributes}
                        element={element}
                        format={format}
                        withCaptions={withCaptions}
                        withMediaGalleryTab={withMediaGalleryTab}
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
                const { withMediaGalleryTab = false } =
                    withGalleryPlaceholders === true ? {} : withGalleryPlaceholders;
                return (
                    <GalleryPlaceholderElement
                        attributes={attributes}
                        element={element}
                        format={format}
                        withCaptions
                        withMediaGalleryTab={withMediaGalleryTab}
                        removable={removable}
                    >
                        {children}
                    </GalleryPlaceholderElement>
                );
            }
            if (
                withGalleryBookmarkPlaceholders &&
                isPlaceholderNode(element, PlaceholderNode.Type.GALLERY_BOOKMARK)
            ) {
                return (
                    <GalleryBookmarkPlaceholderElement
                        {...withGalleryBookmarkPlaceholders}
                        attributes={attributes}
                        element={element}
                        format={format}
                        removable={removable}
                    >
                        {children}
                    </GalleryBookmarkPlaceholderElement>
                );
            }
            if (withMediaPlaceholders && isPlaceholderNode(element, PlaceholderNode.Type.MEDIA)) {
                const { withMediaGalleryTab = false, withCaptions = false } =
                    withMediaPlaceholders === true ? {} : withMediaPlaceholders;

                return (
                    <MediaPlaceholderElement
                        attributes={attributes}
                        element={element}
                        format={format}
                        withCaptions={withCaptions}
                        withMediaGalleryTab={withMediaGalleryTab}
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
                        withImagePlaceholders={Boolean(withImagePlaceholders)}
                        withVideoPlaceholders={Boolean(withVideoPlaceholders)}
                        withWebBookmarkPlaceholders={Boolean(withWebBookmarkPlaceholders)}
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
                return (
                    <VideoPlaceholderElement
                        attributes={attributes}
                        element={element}
                        fetchOembed={withVideoPlaceholders.fetchOembed}
                        format={format}
                        removable={removable}
                        withImagePlaceholders={Boolean(withImagePlaceholders)}
                        withVideoPlaceholders={Boolean(withVideoPlaceholders)}
                        withWebBookmarkPlaceholders={Boolean(withWebBookmarkPlaceholders)}
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
        withOverrides: withPastedUrlsUnfurling(
            isUnfurlingPastedUrls ? isUnfurlingPastedUrls.fetchOembed : undefined,
            {
                isAllowed: isUnfurlingPastedUrls ? isUnfurlingPastedUrls.isAllowed : undefined,
            },
        ),
    };
}
