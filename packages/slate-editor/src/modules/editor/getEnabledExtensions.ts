import type { Extension } from '@prezly/slate-commons';
import type { RefObject } from 'react';

import { noop } from '#lodash';

import { AutoformatExtension } from '#extensions/autoformat';
import { CoverageExtension } from '#extensions/coverage';
import { DecorateSelectionExtension } from '#extensions/decorate-selection';
import { DividerExtension } from '#extensions/divider';
import { EmbedExtension } from '#extensions/embed';
import { FileAttachmentExtension } from '#extensions/file-attachment';
import { FloatingAddMenuExtension } from '#extensions/floating-add-menu';
import { GalleriesExtension } from '#extensions/galleries';
import { HtmlExtension } from '#extensions/html';
import { ImageExtension } from '#extensions/image';
import { InlineLinksExtension } from '#extensions/inline-links';
import { LoaderExtension } from '#extensions/loader';
import { ParagraphsExtension } from '#extensions/paragraphs';
import { PlaceholderMentionsExtension } from '#extensions/placeholder-mentions';
import { PressContactsExtension } from '#extensions/press-contacts';
import { RichFormattingExtension } from '#extensions/rich-formatting';
import { StoryBookmarkExtension } from '#extensions/story-bookmark';
import { StoryEmbedExtension } from '#extensions/story-embed';
import { UserMentionsExtension } from '#extensions/user-mentions';
import { VideoExtension } from '#extensions/video';
import { VoidExtension } from '#extensions/void';
import { WebBookmarkExtension } from '#extensions/web-bookmark';

import { compositeCharactersRules, textStyleRules, blockRules } from './autoformatRules';
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
    containerRef: RefObject<HTMLElement>;
    onFloatingAddMenuToggle: (show?: boolean) => void;
    onOperationEnd?: () => void;
    onOperationStart?: () => void;
} & Pick<
    EditorProps,
    | 'availableWidth'
    | 'withAttachments'
    | 'withCoverage'
    | 'withEmbeds'
    | 'withFloatingAddMenu'
    | 'withGalleries'
    | 'withImages'
    | 'withPlaceholders'
    | 'withPressContacts'
    | 'withRichFormatting'
    | 'withUserMentions'
    | 'withVideos'
    | 'withWebBookmarks'
    | 'withAutoformat'
    | 'withStoryEmbeds'
    | 'withStoryBookmarks'
>;

export function* getEnabledExtensions({
    availableWidth,
    containerRef,
    onFloatingAddMenuToggle,
    onOperationEnd = noop,
    onOperationStart = noop,
    withAttachments,
    withCoverage,
    withEmbeds,
    withFloatingAddMenu,
    withGalleries,
    withImages,
    withPlaceholders,
    withPressContacts,
    withRichFormatting,
    withUserMentions,
    withVideos,
    withWebBookmarks,
    withAutoformat,
    withStoryEmbeds,
    withStoryBookmarks,
}: Parameters): Generator<Extension> {
    yield DecorateSelectionExtension();
    yield ParagraphsExtension();

    if (withFloatingAddMenu) {
        yield FloatingAddMenuExtension(onFloatingAddMenuToggle);
    }

    if (withPressContacts) {
        yield PressContactsExtension();
    }

    if (withPlaceholders) {
        yield PlaceholderMentionsExtension();
    }

    if (withUserMentions) {
        yield UserMentionsExtension();
    }

    if (withRichFormatting) {
        yield RichFormattingExtension({
            blocks: Boolean(withRichFormatting.blocks),
        });
    }
    if (withRichFormatting?.links) {
        yield InlineLinksExtension();
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
            containerRef,
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
            ...(withRichFormatting?.blocks ? blockRules : []),
            ...(withRichFormatting ? textStyleRules : []),
            ...compositeCharactersRules,
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

    yield DividerExtension();

    yield LoaderExtension({ onOperationEnd, onOperationStart });

    yield VoidExtension();

    yield HtmlExtension();
}
