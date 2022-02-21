import type { Extension } from '@prezly/slate-commons';
import type { RefObject } from 'react';

import { noop } from '#lodash';

import { AutoformatExtension } from '#modules/editor-v4-autoformat';
import { CoverageExtension } from '#modules/editor-v4-coverage';
import { DividerExtension } from '#modules/editor-v4-divider';
import { EmbedExtension } from '#modules/editor-v4-embed';
import { FileAttachmentExtension } from '#modules/editor-v4-file-attachment';
import { FloatingAddMenuExtension } from '#modules/editor-v4-floating-add-menu';
import { GalleriesExtension } from '#modules/editor-v4-galleries';
import { HtmlExtension } from '#modules/editor-v4-html';
import { ImageExtension } from '#modules/editor-v4-image';
import { LoaderExtension } from '#modules/editor-v4-loader';
import { ParagraphsExtension } from '#modules/editor-v4-paragraphs';
import { PlaceholderMentionsExtension } from '#modules/editor-v4-placeholder-mentions';
import { PressContactsExtension } from '#modules/editor-v4-press-contacts';
import { RichFormattingExtension } from '#modules/editor-v4-rich-formatting';
import { UserMentionsExtension } from '#modules/editor-v4-user-mentions';

import { VideoExtension } from '../editor-v4-video';
import { VoidExtension } from '../editor-v4-void';
import { WebBookmarkExtension } from '../editor-v4-web-bookmark';

import { compositeCharactersRules, textStyleRules, blockRules } from './autoformatRules';
import {
    createHandleEditGallery,
    createHandleEditImage,
    handleEditAttachment,
    handleRemoveAttachment,
    handleRemoveImage,
} from './lib';
import type { EditorV4ExtensionsProps } from './types';
import { InlineLinksExtension } from '#modules/editor-v4-inline-links';

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
}: Parameters): Generator<Extension> {
    yield ParagraphsExtension();

    if (withFloatingAddMenu) {
        yield FloatingAddMenuExtension(onFloatingAddMenuToggle);
    }

    if (withPressContacts) {
        yield PressContactsExtension({ containerRef });
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
            containerRef,
            onEdit: handleEditAttachment,
            onRemove: handleRemoveAttachment,
        });
    }

    if (withCoverage) {
        yield CoverageExtension({ ...withCoverage, containerRef });
    }

    if (withGalleries) {
        yield GalleriesExtension({
            availableWidth,
            containerRef,
            onEdit: createHandleEditGallery(withGalleries),
        });
    }

    if (withImages) {
        // ImageExtension has to be after RichFormattingExtension due to the fact
        // that it also deserializes <a> elements (ImageExtension is more specific).
        yield ImageExtension({
            ...withImages,
            availableWidth,
            containerRef,
            onEdit: createHandleEditImage(withImages),
            onRemove: handleRemoveImage,
        });
    }

    if (withEmbeds) {
        yield EmbedExtension({
            ...withEmbeds,
            availableWidth,
            containerRef,
        });
    }

    if (withVideos) {
        yield VideoExtension({
            ...withVideos,
            availableWidth,
            containerRef,
        });
    }

    if (withWebBookmarks) {
        yield WebBookmarkExtension();
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

    yield DividerExtension();

    yield LoaderExtension({ onOperationEnd, onOperationStart });

    yield VoidExtension();

    yield HtmlExtension();
}
