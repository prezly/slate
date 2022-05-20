import type { Extension } from '@prezly/slate-commons';
import type { RefObject } from 'react';

import { noop } from '#lodash';

import { AutoformatExtension } from '#extensions/editor-v4-autoformat';
import { CoverageExtension } from '#extensions/editor-v4-coverage';
import { DecorateSelectionExtension } from '#extensions/editor-v4-decorate-selection';
import { DividerExtension } from '#extensions/editor-v4-divider';
import { EmbedExtension } from '#extensions/editor-v4-embed';
import { FileAttachmentExtension } from '#extensions/editor-v4-file-attachment';
import { FloatingAddMenuExtension } from '#extensions/editor-v4-floating-add-menu';
import { GalleriesExtension } from '#extensions/editor-v4-galleries';
import { HtmlExtension } from '#extensions/editor-v4-html';
import { ImageExtension } from '#extensions/editor-v4-image';
import { InlineLinksExtension } from '#extensions/editor-v4-inline-links';
import { LoaderExtension } from '#extensions/editor-v4-loader';
import { ParagraphsExtension } from '#extensions/editor-v4-paragraphs';
import { PlaceholderMentionsExtension } from '#extensions/editor-v4-placeholder-mentions';
import { PressContactsExtension } from '#extensions/editor-v4-press-contacts';
import { RichFormattingExtension } from '#extensions/editor-v4-rich-formatting';
import { StoryBookmarkExtension } from '#extensions/editor-v4-story-bookmark';
import { StoryEmbedExtension } from '#extensions/editor-v4-story-embed';
import { UserMentionsExtension } from '#extensions/editor-v4-user-mentions';
import { VideoExtension } from '#extensions/editor-v4-video';
import { VoidExtension } from '#extensions/editor-v4-void';
import { WebBookmarkExtension } from '#extensions/editor-v4-web-bookmark';

import { compositeCharactersRules, textStyleRules, blockRules } from './autoformatRules';
import {
    createHandleEditGallery,
    createImageEditHandler,
    createImageReplaceHandler,
    handleEditAttachment,
    handleRemoveAttachment,
    handleRemoveImage,
} from './lib';
import type { EditorV4ExtensionsProps } from './types';

interface Parameters extends EditorV4ExtensionsProps {
    containerRef: RefObject<HTMLElement>;
    onFloatingAddMenuToggle: (show?: boolean) => void;
    onOperationEnd?: () => void;
    onOperationStart?: () => void;
}

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
            ...withAttachments,
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
