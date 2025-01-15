import {
    BookmarkNode,
    isAttachmentNode,
    isContactNode,
    isCoverageNode,
    isGalleryNode,
    isImageNode,
    isStoryBookmarkNode,
    isStoryEmbedNode,
    VideoNode,
} from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import type { Element } from '@udecode/plate';
import { createPlatePlugin } from '@udecode/plate/react';

import { EmbedNode } from '#extensions/embed';
import { PlaceholderNode } from '#extensions/placeholders';

export const ElementsEqualityCheckPlugin = createPlatePlugin({
    key: 'withElementsEqualityCheck',
}).overrideEditor(() => {
    return {
        api: {
            isElementEqual,
        },
    };
});

function isElementEqual(node: Element, another: Element): boolean | undefined {
    if (isAttachmentNode(node) && isAttachmentNode(another)) {
        // Compare ignoring `uuid`
        return node.description === another.description && isEqual(node.file, another.file);
    }
    if (BookmarkNode.isBookmarkNode(node) && BookmarkNode.isBookmarkNode(another)) {
        // Compare ignoring `uuid` and `children`
        return (
            node.url === another.url &&
            node.show_thumbnail === another.show_thumbnail &&
            node.layout === another.layout &&
            node.new_tab === another.new_tab &&
            isEqual(node.oembed, another.oembed)
        );
    }
    if (isContactNode(node) && isContactNode(another)) {
        if (node.layout !== another.layout || node.show_avatar !== another.show_avatar) {
            return false;
        }
        // If these are contact references, then ContactInfo object is irrelevant
        if (node.reference || another.reference) {
            return node.reference === another.reference;
        }
        // Otherwise, compare ContactInfo ignoring node `uuid` and `reference`
        return isEqual(node.contact, another.contact);
    }
    if (isCoverageNode(node) && isCoverageNode(another)) {
        return (
            node.coverage.id === another.coverage.id &&
            node.layout === another.layout &&
            node.new_tab === another.new_tab &&
            node.show_thumbnail === another.show_thumbnail
        );
    }
    if (EmbedNode.isEmbedNode(node) && EmbedNode.isEmbedNode(another)) {
        return (
            node.url === another.url &&
            node.layout === another.layout &&
            isEqual(node.oembed, another.oembed)
        );
    }
    if (isGalleryNode(node) && isGalleryNode(another)) {
        return (
            node.layout === another.layout &&
            node.padding === another.padding &&
            node.thumbnail_size === another.thumbnail_size &&
            isEqual(node.images, another.images)
        );
    }
    if (isImageNode(node) && isImageNode(another)) {
        return (
            node.href === another.href &&
            node.layout === another.layout &&
            node.align === another.align &&
            node.new_tab === another.new_tab &&
            node.width === another.width &&
            isEqual(node.file, another.file)
        );
    }
    if (PlaceholderNode.isPlaceholderNode(node) && PlaceholderNode.isPlaceholderNode(another)) {
        // Consider placeholders equal, if they are of the same type ignoring `uuid`
        return node.type === another.type;
    }
    if (isStoryBookmarkNode(node) && isStoryBookmarkNode(another)) {
        return (
            node.story.uuid === another.story.uuid &&
            node.show_thumbnail === another.show_thumbnail &&
            node.new_tab === another.new_tab &&
            node.layout === another.layout
        );
    }
    if (isStoryEmbedNode(node) && isStoryEmbedNode(another)) {
        return (
            node.story.uuid === another.story.uuid &&
            node.appearance === another.appearance &&
            node.position === another.position &&
            node.header_footer === another.header_footer
        );
    }
    if (VideoNode.isVideoNode(node) && VideoNode.isVideoNode(another)) {
        return (
            node.url === another.url &&
            node.layout === another.layout &&
            isEqual(node.oembed, another.oembed)
        );
    }

    return undefined;
}
