import { EditorCommands } from '@prezly/slate-commons';
import { isImageNode, isQuoteNode } from '@prezly/slate-types';
import React from 'react';
import { Node } from 'slate';

import { AllowedBlocksExtension } from '#extensions/allowed-blocks';
import { AutoformatExtension } from '#extensions/autoformat';
import { BlockquoteExtension } from '#extensions/blockquote';
import { ButtonBlockExtension } from '#extensions/button-block';
import { CoverageExtension } from '#extensions/coverage';
import { CustomNormalizationExtension } from '#extensions/custom-normalization';
import { DecorateSelectionExtension } from '#extensions/decorate-selection';
import { DividerExtension } from '#extensions/divider';
import { EmbedExtension } from '#extensions/embed';
import { FileAttachmentExtension } from '#extensions/file-attachment';
import { FlashNodesExtension } from '#extensions/flash-nodes';
import { FloatingAddMenuExtension } from '#extensions/floating-add-menu';
import { GalleriesExtension } from '#extensions/galleries';
import { HeadingExtension } from '#extensions/heading';
import { HotkeysExtension } from '#extensions/hotkeys';
import { HtmlExtension } from '#extensions/html';
import { ImageExtension } from '#extensions/image';
import { InlineContactsExtension } from '#extensions/inline-contacts';
import { InlineLinksExtension } from '#extensions/inline-links';
import { InsertBlockHotkeyExtension } from '#extensions/insert-block-hotkey';
import { ListExtension } from '#extensions/list';
import { createParagraph, ParagraphsExtension } from '#extensions/paragraphs';
import { PasteFilesExtension } from '#extensions/paste-files';
import { PasteImagesExtension } from '#extensions/paste-images';
import { PasteSlateContentExtension } from '#extensions/paste-slate-content';
import { PlaceholdersExtension } from '#extensions/placeholders';
import { PressContactsExtension } from '#extensions/press-contacts';
import { SnippetsExtension } from '#extensions/snippet';
import { SoftBreakExtension } from '#extensions/soft-break';
import { StoryBookmarkExtension } from '#extensions/story-bookmark';
import { StoryEmbedExtension } from '#extensions/story-embed';
import { TablesExtension } from '#extensions/tables';
import { TextStylingExtension } from '#extensions/text-styling';
import { UserMentionsExtension } from '#extensions/user-mentions';
import { VariablesExtension } from '#extensions/variables';
import { VideoExtension } from '#extensions/video';
import { VoidExtension } from '#extensions/void';
import { WebBookmarkExtension } from '#extensions/web-bookmark';
import { EventsEditor } from '#modules/events';

import { UPLOAD_MULTIPLE_IMAGES_SOME_ERROR_MESSAGE } from '../uploadcare';

import {
    BLOCKQUOTE_RULES,
    COMPOSITE_CHARACTERS_RULES,
    DIVIDER_RULES,
    HEADING_RULES,
    LIST_RULES,
    TEXT_STYLE_RULES,
} from './autoformatRules';
import type { EditorProps } from './types';

type Props = {
    availableWidth: number;
    onFloatingAddMenuToggle: (show: boolean, trigger: 'input' | 'hotkey') => void;
} & Pick<
    Required<EditorProps>,
    | 'withAllowedBlocks'
    | 'withAttachments'
    | 'withAutoformat'
    | 'withBlockquotes'
    | 'withButtonBlocks'
    | 'withCoverage'
    | 'withCustomNormalization'
    | 'withDivider'
    | 'withEmbeds'
    | 'withFloatingAddMenu'
    | 'withGalleries'
    | 'withHeadings'
    | 'withImages'
    | 'withInlineContacts'
    | 'withInlineLinks'
    | 'withLists'
    | 'withPlaceholders'
    | 'withPressContacts'
    | 'withTextStyling'
    | 'withTables'
    | 'withUserMentions'
    | 'withVariables'
    | 'withVideos'
    | 'withWebBookmarks'
    | 'withStoryEmbeds'
    | 'withStoryBookmarks'
    | 'withSnippets'
>;

export function Extensions({
    availableWidth,
    onFloatingAddMenuToggle,
    withAllowedBlocks,
    withAttachments,
    withAutoformat,
    withBlockquotes,
    withButtonBlocks,
    withCoverage,
    withCustomNormalization,
    withDivider,
    withEmbeds,
    withFloatingAddMenu,
    withGalleries,
    withHeadings,
    withImages,
    withInlineContacts,
    withInlineLinks,
    withLists,
    withPlaceholders,
    withPressContacts,
    withSnippets,
    withStoryBookmarks,
    withStoryEmbeds,
    withTables,
    withTextStyling,
    withUserMentions,
    withVariables,
    withVideos,
    withWebBookmarks,
}: Props) {
    if (withPressContacts && withInlineContacts) {
        throw new Error(
            `Using 'withPressContacts' and 'withInlineContacts' at the same time is not supported.`,
        );
    }

    return (
        <>
            {withCustomNormalization && (
                <CustomNormalizationExtension normalizeNode={withCustomNormalization} />
            )}

            {/* We only use it for rendering the selection marks decorations.
            The automatic selection decoration itself is disabled and is dynamically attached
            using the `useDecorationFactory()` call in the RichFormattingMenu component. */}
            <DecorateSelectionExtension decorate={false} />

            <FlashNodesExtension />

            <ParagraphsExtension />

            <SoftBreakExtension />

            <InsertBlockHotkeyExtension
                createDefaultElement={createParagraph}
                onInserted={(editor) => {
                    EventsEditor.dispatchEvent(editor, 'empty-paragraph-inserted', {
                        trigger: 'hotkey',
                    });
                }}
            />

            {withBlockquotes && <BlockquoteExtension />}

            {withButtonBlocks && (
                <ButtonBlockExtension {...(withButtonBlocks === true ? {} : withButtonBlocks)} />
            )}

            {withDivider && <DividerExtension />}

            {withFloatingAddMenu && (
                <FloatingAddMenuExtension
                    onOpen={(trigger) => onFloatingAddMenuToggle(true, trigger)}
                />
            )}

            {withHeadings && <HeadingExtension />}

            {withInlineContacts && <InlineContactsExtension />}

            {withInlineLinks && <InlineLinksExtension />}

            {/* Since we're overriding the default Tab key behavior
            we need to bring back the possibility to blur the editor with keyboard. */}
            <HotkeysExtension />

            {withLists && <ListExtension />}

            {withPressContacts && <PressContactsExtension />}

            {withVariables && <VariablesExtension {...withVariables} />}

            {withTextStyling && <TextStylingExtension />}

            {withUserMentions && <UserMentionsExtension />}

            {withAttachments && (
                <>
                    <PasteFilesExtension
                        onFilesPasted={(editor, files) => {
                            EventsEditor.dispatchEvent(editor, 'files-pasted', {
                                filesCount: files.length,
                                isEmpty: EditorCommands.isEmpty(editor),
                            });
                        }}
                    />
                    <FileAttachmentExtension
                        onEdited={(editor, updated) => {
                            // TODO: It seems it would be more useful to only provide the changeset patch in the event payload.
                            EventsEditor.dispatchEvent(editor, 'attachment-edited', {
                                description: updated.description,
                                mimeType: updated.file.mime_type,
                                size: updated.file.size,
                                uuid: updated.file.uuid,
                            });
                        }}
                        onRemoved={(editor, attachment) => {
                            EventsEditor.dispatchEvent(editor, 'attachment-removed', {
                                uuid: attachment.file.uuid,
                            });
                        }}
                    />
                </>
            )}

            {withCoverage && <CoverageExtension {...withCoverage} />}

            {withGalleries && (
                <GalleriesExtension
                    availableWidth={availableWidth}
                    onEdited={(editor, gallery, { failedUploads }) => {
                        EventsEditor.dispatchEvent(editor, 'gallery-edited', {
                            imagesCount: gallery.images.length,
                        });

                        failedUploads.forEach((error) => {
                            EventsEditor.dispatchEvent(editor, 'error', error);
                        });

                        if (failedUploads.length > 0) {
                            EventsEditor.dispatchEvent(editor, 'notification', {
                                children: UPLOAD_MULTIPLE_IMAGES_SOME_ERROR_MESSAGE,
                                type: 'error',
                            });
                        }
                    }}
                    onShuffled={(editor, updated) => {
                        EventsEditor.dispatchEvent(editor, 'gallery-images-shuffled', {
                            imagesCount: updated.images.length,
                        });
                    }}
                    withMediaGalleryTab={withGalleries.withMediaGalleryTab ?? false}
                    withLayoutOptions={withGalleries.withWidthOption}
                />
            )}

            {withImages && (
                <>
                    <PasteImagesExtension
                        onImagesPasted={(editor, images) => {
                            EventsEditor.dispatchEvent(editor, 'images-pasted', {
                                imagesCount: images.length,
                                isEmpty: EditorCommands.isEmpty(editor),
                            });
                        }}
                    />
                    {/*
                        ImageExtension has to be after RichFormattingExtension due to the fact
                        that it also deserializes <a> elements (ImageExtension is more specific).
                    */}
                    <ImageExtension
                        {...withImages}
                        onCrop={(editor) => {
                            EventsEditor.dispatchEvent(editor, 'image-edit-clicked');
                        }}
                        onRemoved={(editor, image) => {
                            EventsEditor.dispatchEvent(editor, 'image-removed', {
                                uuid: image.file.uuid,
                            });
                        }}
                        onReplace={(editor) => {
                            EventsEditor.dispatchEvent(editor, 'image-edit-clicked');
                        }}
                        onReplaced={(editor, updated) => {
                            EventsEditor.dispatchEvent(editor, 'image-edited', {
                                description: Node.string(updated),
                                mimeType: updated.file.mime_type,
                                size: updated.file.size,
                                uuid: updated.file.uuid,
                                trigger: 'image-menu',
                                operation: 'replace',
                            });
                        }}
                    />
                </>
            )}

            {withEmbeds && <EmbedExtension availableWidth={availableWidth} {...withEmbeds} />}

            {withVideos && <VideoExtension {...withVideos} />}

            {withWebBookmarks && <WebBookmarkExtension {...withWebBookmarks} />}

            {withAutoformat && (
                <AutoformatExtension
                    rules={
                        typeof withAutoformat === 'object'
                            ? withAutoformat.rules
                            : [
                                  ...(withBlockquotes ? BLOCKQUOTE_RULES : []),
                                  ...(withDivider ? DIVIDER_RULES : []),
                                  ...(withHeadings ? HEADING_RULES : []),
                                  ...(withLists ? LIST_RULES : []),
                                  ...(withTextStyling ? TEXT_STYLE_RULES : []),
                                  ...COMPOSITE_CHARACTERS_RULES,
                              ]
                    }
                />
            )}

            <PlaceholdersExtension
                withAttachmentPlaceholders={Boolean(withAttachments)}
                withContactPlaceholders={withPressContacts}
                withCoveragePlaceholders={withCoverage}
                withEmbedPlaceholders={withEmbeds}
                withGalleryPlaceholders={
                    withGalleries && {
                        newsroom: withGalleries.withMediaGalleryTab
                            ? withGalleries.withMediaGalleryTab.newsroom
                            : undefined,
                    }
                }
                withImagePlaceholders={
                    withImages && {
                        withCaptions: Boolean(withImages.withCaptions),
                        newsroom: withImages.mediaGalleryTab?.newsroom,
                    }
                }
                withInlineContactPlaceholders={withInlineContacts}
                withMediaPlaceholders={withPlaceholders?.withMediaPlaceholders}
                withSocialPostPlaceholders={withEmbeds}
                withStoryBookmarkPlaceholders={withStoryBookmarks}
                withStoryEmbedPlaceholders={withStoryEmbeds}
                withPastedUrlsUnfurling={
                    withEmbeds && withPlaceholders
                        ? withPlaceholders.withPastedUrlsUnfurling
                        : undefined
                }
                withVideoPlaceholders={withVideos}
                withWebBookmarkPlaceholders={withWebBookmarks}
            />

            {withSnippets && <SnippetsExtension />}

            {withStoryEmbeds && <StoryEmbedExtension {...withStoryEmbeds} />}

            {withStoryBookmarks && <StoryBookmarkExtension {...withStoryBookmarks} />}

            {withTables && <TablesExtension createDefaultElement={createParagraph} />}

            {withAllowedBlocks && <AllowedBlocksExtension {...withAllowedBlocks} />}

            <VoidExtension />

            <HtmlExtension />

            <PasteSlateContentExtension
                isPreservedBlock={(_, node) => isImageNode(node) || isQuoteNode(node)}
            />
        </>
    );
}
