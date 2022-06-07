import type { Extension } from '@prezly/slate-commons';

import { noop } from '#lodash';

import { AutoformatExtension } from '#extensions/autoformat';
import { BlockquoteExtension } from '#extensions/blockquote';
import { CoverageExtension } from '#extensions/coverage';
import { DecorateSelectionExtension } from '#extensions/decorate-selection';
import { DividerExtension } from '#extensions/divider';
import { EmbedExtension } from '#extensions/embed';
import { FileAttachmentExtension } from '#extensions/file-attachment';
import { FloatingAddMenuExtension } from '#extensions/floating-add-menu';
import { GalleriesExtension } from '#extensions/galleries';
import { HeadingExtension } from '#extensions/heading';
import { HtmlExtension } from '#extensions/html';
import { ImageExtension } from '#extensions/image';
import { InlineLinksExtension } from '#extensions/inline-links';
import { ListExtension } from '#extensions/list';
import { LoaderExtension } from '#extensions/loader';
import { ParagraphsExtension } from '#extensions/paragraphs';
import { PlaceholderMentionsExtension } from '#extensions/placeholder-mentions';
import { PressContactsExtension } from '#extensions/press-contacts';
import { SoftBreakExtension } from '#extensions/soft-break';
import { StoryBookmarkExtension } from '#extensions/story-bookmark';
import { StoryEmbedExtension } from '#extensions/story-embed';
import { TextStylingExtension } from '#extensions/text-styling';
import { UserMentionsExtension } from '#extensions/user-mentions';
import { VideoExtension } from '#extensions/video';
import { VoidExtension } from '#extensions/void';
import { WebBookmarkExtension } from '#extensions/web-bookmark';

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
    onFloatingAddMenuToggle: (show?: boolean) => void;
    onOperationEnd?: () => void;
    onOperationStart?: () => void;
} & Pick<
    Required<EditorProps>,
    | 'withAttachments'
    | 'withAutoformat'
    | 'withBlockquotes'
    | 'withCoverage'
    | 'withDivider'
    | 'withEmbeds'
    | 'withFloatingAddMenu'
    | 'withGalleries'
    | 'withHeadings'
    | 'withImages'
    | 'withInlineLinks'
    | 'withLists'
    | 'withPlaceholders'
    | 'withPressContacts'
    | 'withTextStyling'
    | 'withUserMentions'
    | 'withVideos'
    | 'withWebBookmarks'
    | 'withStoryEmbeds'
    | 'withStoryBookmarks'
>;

export function* getEnabledExtensions({
    availableWidth,
    onFloatingAddMenuToggle,
    onOperationEnd = noop,
    onOperationStart = noop,
    withAttachments,
    withAutoformat,
    withBlockquotes,
    withCoverage,
    withDivider,
    withEmbeds,
    withFloatingAddMenu,
    withGalleries,
    withHeadings,
    withImages,
    withInlineLinks,
    withLists,
    withPlaceholders,
    withPressContacts,
    withTextStyling,
    withUserMentions,
    withVideos,
    withWebBookmarks,
    withStoryEmbeds,
    withStoryBookmarks,
}: Parameters): Generator<Extension> {
    yield DecorateSelectionExtension();
    yield ParagraphsExtension();
    yield SoftBreakExtension();

    if (withBlockquotes) {
        yield BlockquoteExtension();
    }

    if (withDivider) {
        yield DividerExtension();
    }

    if (withFloatingAddMenu) {
        yield FloatingAddMenuExtension(onFloatingAddMenuToggle);
    }

    if (withHeadings) {
        yield HeadingExtension();
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

    if (withPlaceholders) {
        yield PlaceholderMentionsExtension();
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
        yield VideoExtension();
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

    if (withStoryEmbeds) {
        yield StoryEmbedExtension(withStoryEmbeds);
    }

    if (withStoryBookmarks) {
        yield StoryBookmarkExtension(withStoryBookmarks);
    }

    yield LoaderExtension({ onOperationEnd, onOperationStart });

    yield VoidExtension();

    yield HtmlExtension();
}
