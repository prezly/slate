import { Extension } from '@prezly/slate-commons';
import { noop } from 'lodash';
import { RefObject } from 'react';

import { CoverageExtension } from '../../modules/editor-v4-coverage';
import { DividerExtension } from '../../modules/editor-v4-divider';
import { EmbedExtension } from '../../modules/editor-v4-embed';
import { FileAttachmentExtension } from '../../modules/editor-v4-file-attachment';
import { GalleriesExtension } from '../../modules/editor-v4-galleries';
import { ImageExtension } from '../../modules/editor-v4-image';
import { LoaderExtension } from '../../modules/editor-v4-loader';
import { ParagraphsExtension } from '../../modules/editor-v4-paragraphs';
import { PlaceholderMentionsExtension } from '../../modules/editor-v4-placeholder-mentions';
import { PressContactsExtension } from '../../modules/editor-v4-press-contacts';
import { RichFormattingExtension } from '../../modules/editor-v4-rich-formatting';
import { UserMentionsExtension } from '../../modules/editor-v4-user-mentions';

import {
    createHandleEditGallery,
    createHandleEditImage,
    handleEditAttachment,
    handleRemoveAttachment,
    handleRemoveImage,
} from './lib';
import { EditorV4ExtensionsProps } from './types';

interface Parameters extends EditorV4ExtensionsProps {
    containerRef: RefObject<HTMLElement>;
    onOperationEnd?: () => void;
    onOperationStart?: () => void;
}

function* getEnabledExtensions({
    availableWidth,
    containerRef,
    onOperationEnd = noop,
    onOperationStart = noop,
    withAttachments,
    withCoverage,
    withEmbeds,
    withGalleries,
    withImages,
    withPlaceholders,
    withPressContacts,
    withRichFormatting,
    withUserMentions,
}: Parameters): Generator<Extension> {
    yield ParagraphsExtension();

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
        yield RichFormattingExtension(withRichFormatting);
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

    yield DividerExtension({ containerRef });

    yield LoaderExtension({ onOperationEnd, onOperationStart });
}

export default getEnabledExtensions;
