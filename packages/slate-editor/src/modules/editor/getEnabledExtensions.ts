import type { Extension } from '@prezly/slate-commons';
import { isImageNode, isQuoteNode } from '@prezly/slate-types';
import { noop } from '@technically/lodash';

import { AllowedBlocksExtension } from '#extensions/allowed-blocks';
import { AutoformatExtension } from '#extensions/autoformat';
import { BlockquoteExtension } from '#extensions/blockquote';
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
import { LoaderExtension } from '#extensions/loader';
import { createParagraph, ParagraphsExtension } from '#extensions/paragraphs';
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

import {
    BLOCKQUOTE_RULES,
    COMPOSITE_CHARACTERS_RULES,
    DIVIDER_RULES,
    HEADING_RULES,
    LIST_RULES,
    TEXT_STYLE_RULES,
} from './autoformatRules';
import {
    createHandleEditGallery,
    createImageEditHandler,
    createImageReplaceHandler,
    handleEditAttachment,
    handleRemoveAttachment,
    handleRemoveImage,
} from './lib';
import type { EditorProps } from './types';

type Parameters = {
    availableWidth: number;
    onFloatingAddMenuToggle: (show: boolean, trigger: 'input' | 'hotkey') => void;
    onOperationEnd?: () => void;
    onOperationStart?: () => void;
} & Pick<
    Required<EditorProps>,
    | 'withAllowedBlocks'
    | 'withAttachments'
    | 'withAutoformat'
    | 'withBlockquotes'
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
        onOperationEnd = noop,
        onOperationStart = noop,
        withAllowedBlocks,
        withAttachments,
        withAutoformat,
        withBlockquotes,
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

    yield DecorateSelectionExtension();
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
        yield FileAttachmentExtension({
            onEdit: handleEditAttachment,
            onRemove: handleRemoveAttachment,
        });
    }

    if (withCoverage) {
        yield CoverageExtension(withCoverage);
    }

    if (withGalleries) {
        yield GalleriesExtension({
            availableWidth,
            onEdit: createHandleEditGallery(withGalleries),
            withWidthOption: withGalleries.withWidthOption,
        });
    }

    if (withImages) {
        const handleCrop = createImageEditHandler(withImages);
        const handleReplace = createImageReplaceHandler(withImages);
        // ImageExtension has to be after RichFormattingExtension due to the fact
        // that it also deserializes <a> elements (ImageExtension is more specific).
        yield ImageExtension({
            ...withImages,
            onCrop: handleCrop,
            onRemove: handleRemoveImage,
            onReplace: handleReplace,
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
        yield WebBookmarkExtension({ withNewTabOption: withWebBookmarks.withNewTabOption });
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

    yield LoaderExtension({ onOperationEnd, onOperationStart });

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
            };
        }
        if (withGalleries) {
            yield {
                withGalleryPlaceholders: {
                    newsroom: withGalleries.mediaGalleryTab?.newsroom,
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
                    withCaptions: Boolean(withImages.captions),
                    newsroom: withImages.mediaGalleryTab?.newsroom,
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
