import type { Extension } from '@prezly/slate-commons';
import { isImageNode, isQuoteNode } from '@prezly/slate-types';
import { noop } from 'lodash-es';

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
import { HtmlExtension } from '#extensions/html';
import { ImageExtension } from '#extensions/image';
import { InlineContactsExtension } from '#extensions/inline-contacts';
import { InlineLinksExtension } from '#extensions/inline-links';
import { InsertBlockHotkeyExtension } from '#extensions/insert-block-hotkey';
import { ListExtension } from '#extensions/list';
import { LoaderExtension } from '#extensions/loader';
import { createParagraph, ParagraphsExtension } from '#extensions/paragraphs';
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

export function* getEnabledExtensions({
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
    withPlaceholders,
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
}: Parameters): Generator<Extension> {
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

    if (withPlaceholders) {
        yield PlaceholdersExtension(withPlaceholders);
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
