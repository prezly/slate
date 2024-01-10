import { EditorCommands, type Extension } from '@prezly/slate-commons';
import { TablesEditor } from '@prezly/slate-tables';
import { isImageNode, isQuoteNode } from '@prezly/slate-types';
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
import type { PlaceholdersExtensionParameters } from '#extensions/placeholders';
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
import { UPLOAD_MULTIPLE_IMAGES_SOME_ERROR_MESSAGE } from '#modules/uploadcare';

import {
    BLOCKQUOTE_RULES,
    COMPOSITE_CHARACTERS_RULES,
    DIVIDER_RULES,
    HEADING_RULES,
    LIST_RULES,
    TEXT_STYLE_RULES,
} from './autoformatRules';
import type { EditorProps } from './types';

type Parameters = {
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

export function* getEnabledExtensions(parameters: Parameters): Generator<Extension> {
    const {
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
        withPressContacts,
        withSnippets,
        withStoryBookmarks,
        withStoryEmbeds,
        withTextStyling,
        withTables,
        withUserMentions,
        withVariables,
        withVideos,
        withWebBookmarks,
    } = parameters;
    if (withPressContacts && withInlineContacts) {
        throw new Error(
            `Using 'withPressContacts' and 'withInlineContacts' at the same time is not supported.`,
        );
    }

    if (withCustomNormalization) {
        yield CustomNormalizationExtension({ normalizeNode: withCustomNormalization });
    }

    // We only use it for rendering the selection marks decorations.
    // The automatic selection decoration itself is disabled and is dynamically attached
    // using the `useDecorationFactory()` call in the RichFormattingMenu component.
    yield DecorateSelectionExtension({ decorate: false });

    yield FlashNodesExtension();
    yield ParagraphsExtension();
    yield SoftBreakExtension();
    yield InsertBlockHotkeyExtension({
        createDefaultElement: createParagraph,
        onInserted: (editor) =>
            EventsEditor.dispatchEvent(editor, 'empty-paragraph-inserted', { trigger: 'hotkey' }),
    });

    if (withBlockquotes) {
        yield BlockquoteExtension();
    }

    if (withButtonBlocks) {
        const config = withButtonBlocks === true ? {} : withButtonBlocks;
        yield ButtonBlockExtension(config);
    }

    if (withDivider) {
        yield DividerExtension();
    }

    if (withFloatingAddMenu) {
        yield FloatingAddMenuExtension({
            onOpen: (trigger) => onFloatingAddMenuToggle(true, trigger),
        });
    }

    if (withHeadings) {
        yield HeadingExtension();
    }

    if (withInlineContacts) {
        yield InlineContactsExtension();
    }

    if (withInlineLinks) {
        yield InlineLinksExtension();
    }

    // Since we're overriding the default Tab key behavior
    // we need to bring back the possibility to blur the editor
    // with keyboard.
    yield HotkeysExtension();

    if (withLists) {
        yield ListExtension();
    }

    if (withPressContacts) {
        yield PressContactsExtension();
    }

    if (withVariables) {
        yield VariablesExtension(withVariables);
    }

    if (withTextStyling) {
        yield TextStylingExtension();
    }

    if (withUserMentions) {
        yield UserMentionsExtension();
    }

    if (withAttachments) {
        yield PasteFilesExtension({
            onFilesPasted: (editor, files) => {
                EventsEditor.dispatchEvent(editor, 'files-pasted', {
                    filesCount: files.length,
                    isEmpty: EditorCommands.isEmpty(editor),
                });
            },
        });

        yield FileAttachmentExtension({
            onEdited(editor, updated) {
                // TODO: It seems it would be more useful to only provide the changeset patch in the event payload.
                EventsEditor.dispatchEvent(editor, 'attachment-edited', {
                    description: updated.description,
                    mimeType: updated.file.mime_type,
                    size: updated.file.size,
                    uuid: updated.file.uuid,
                });
            },
            onRemoved(editor, attachment) {
                EventsEditor.dispatchEvent(editor, 'attachment-removed', {
                    uuid: attachment.file.uuid,
                });
            },
        });
    }

    if (withCoverage) {
        yield CoverageExtension(withCoverage);
    }

    if (withGalleries) {
        yield GalleriesExtension({
            availableWidth,
            onEdited(editor, gallery, { failedUploads }) {
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
            },
            onShuffled(editor, updated) {
                EventsEditor.dispatchEvent(editor, 'gallery-images-shuffled', {
                    imagesCount: updated.images.length,
                });
            },
            withMediaGalleryTab: withGalleries.withMediaGalleryTab ?? false,
            withLayoutOptions: withGalleries.withLayoutOptions,
        });
    }

    if (withImages) {
        yield PasteImagesExtension({
            onImagesPasted: (editor, images) => {
                EventsEditor.dispatchEvent(editor, 'images-pasted', {
                    imagesCount: images.length,
                    isEmpty: EditorCommands.isEmpty(editor),
                });
            },
        });

        // ImageExtension has to be after RichFormattingExtension due to the fact
        // that it also deserializes <a> elements (ImageExtension is more specific).
        yield ImageExtension({
            ...withImages,
            onCrop(editor) {
                EventsEditor.dispatchEvent(editor, 'image-edit-clicked');
            },
            onCropped(editor, image) {
                EventsEditor.dispatchEvent(editor, 'image-edited', {
                    description: Node.string(image),
                    mimeType: image.file.mime_type,
                    size: image.file.size,
                    uuid: image.file.uuid,
                    trigger: 'image-menu',
                    operation: 'crop',
                });
            },
            onRemoved(editor, image) {
                EventsEditor.dispatchEvent(editor, 'image-removed', { uuid: image.file.uuid });
            },
            onReplace(editor) {
                EventsEditor.dispatchEvent(editor, 'image-edit-clicked');
            },
            onReplaced(editor, image) {
                EventsEditor.dispatchEvent(editor, 'image-edited', {
                    description: Node.string(image),
                    mimeType: image.file.mime_type,
                    size: image.file.size,
                    uuid: image.file.uuid,
                    trigger: 'image-menu',
                    operation: 'replace',
                });
            },
        });
    }

    if (withEmbeds) {
        yield EmbedExtension({
            ...withEmbeds,
            availableWidth,
        });
    }

    if (withVideos) {
        yield VideoExtension(withVideos);
    }

    if (withWebBookmarks) {
        yield WebBookmarkExtension(withWebBookmarks);
    }

    if (withAutoformat) {
        const defaultRules = [
            ...(withBlockquotes ? BLOCKQUOTE_RULES : []),
            ...(withDivider ? DIVIDER_RULES : []),
            ...(withHeadings ? HEADING_RULES : []),
            ...(withLists ? LIST_RULES : []),
            ...(withTextStyling ? TEXT_STYLE_RULES : []),
            ...COMPOSITE_CHARACTERS_RULES,
        ];
        const rules = withAutoformat === true ? defaultRules : withAutoformat.rules;
        yield AutoformatExtension({ rules });
    }

    const placeholders = buildPlaceholdersExtensionConfiguration(parameters);
    if (placeholders) {
        yield PlaceholdersExtension(placeholders);
    }

    if (withSnippets) {
        yield SnippetsExtension(withSnippets);
    }

    if (withStoryEmbeds) {
        yield StoryEmbedExtension(withStoryEmbeds);
    }

    if (withStoryBookmarks) {
        yield StoryBookmarkExtension(withStoryBookmarks);
    }

    if (withTables) {
        yield TablesExtension({ createDefaultElement: createParagraph });
    }

    if (withAllowedBlocks) {
        yield AllowedBlocksExtension(withAllowedBlocks);
    }

    yield VoidExtension();

    yield HtmlExtension();

    yield PasteSlateContentExtension({
        isPreservedBlock: (_, node) => isImageNode(node) || isQuoteNode(node),
    });
}

function buildPlaceholdersExtensionConfiguration({
    withAttachments,
    withCoverage,
    withEmbeds,
    withGalleries,
    withImages,
    withInlineContacts,
    withPlaceholders,
    withPressContacts,
    withStoryBookmarks,
    withStoryEmbeds,
    withVideos,
    withWebBookmarks,
}: Parameters): PlaceholdersExtensionParameters | false {
    function* generate(): Generator<Partial<PlaceholdersExtensionParameters>> {
        if (withAttachments) {
            yield {
                withAttachmentPlaceholders: true,
            };
        }
        if (withCoverage) {
            yield {
                withCoveragePlaceholders: withCoverage,
            };
        }
        if (withEmbeds) {
            yield {
                withEmbedPlaceholders: withEmbeds,
                withSocialPostPlaceholders: withEmbeds,
                withPastedUrlsUnfurling:
                    withEmbeds && withPlaceholders && withPlaceholders.withPastedUrlsUnfurling
                        ? {
                              isAllowed(editor) {
                                  const isSelectionEmpty = EditorCommands.isSelectionEmpty(editor);
                                  const isInsideTable = TablesEditor.isTablesEditor(editor)
                                      ? TablesEditor.isInTable(editor)
                                      : false;

                                  return isSelectionEmpty && !isInsideTable;
                              },
                              ...withPlaceholders.withPastedUrlsUnfurling,
                          }
                        : false,
            };
        }
        if (withGalleries) {
            yield {
                withGalleryPlaceholders: {
                    withMediaGalleryTab: withGalleries.withMediaGalleryTab ?? false,
                },
            };
        }
        if (withInlineContacts) {
            yield {
                withInlineContactPlaceholders: withInlineContacts,
            };
        }
        if (withImages) {
            yield {
                withImagePlaceholders: {
                    withCaptions: Boolean(withImages.withCaptions),
                    withMediaGalleryTab: withImages.withMediaGalleryTab ?? false,
                },
            };
        }
        if (withPlaceholders && withPlaceholders.withMediaPlaceholders) {
            yield {
                withMediaPlaceholders: withPlaceholders.withMediaPlaceholders,
            };
        }
        if (withPressContacts) {
            yield {
                withContactPlaceholders: withPressContacts,
            };
        }
        if (withStoryBookmarks) {
            yield {
                withStoryBookmarkPlaceholders: withStoryBookmarks,
            };
        }
        if (withStoryEmbeds) {
            yield {
                withStoryEmbedPlaceholders: withStoryEmbeds,
            };
        }
        if (withWebBookmarks) {
            yield {
                withWebBookmarkPlaceholders: withWebBookmarks,
            };
        }
        if (withVideos) {
            yield {
                withVideoPlaceholders: withVideos,
            };
        }
    }

    const extensions = Array.from(generate());

    if (extensions.length === 0) {
        return false;
    }

    return extensions.reduce(
        (config, part): PlaceholdersExtensionParameters => ({ ...config, ...part }),
        withPlaceholders,
    );
}
