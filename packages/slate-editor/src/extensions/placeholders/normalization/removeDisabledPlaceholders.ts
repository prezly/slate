import type { Normalize } from '@prezly/slate-commons';
import { Transforms } from 'slate';

import { PlaceholderNode } from '../PlaceholderNode';

interface Parameters {
    withAttachmentPlaceholders: boolean;
    withContactPlaceholders: boolean;
    withCoveragePlaceholders: boolean;
    withImagePlaceholders: boolean;
    withInlineContactPlaceholders: boolean;
    withGalleryPlaceholders: boolean;
    withGalleryBookmarkPlaceholders: boolean;
    withEmbedPlaceholders: boolean;
    withMediaPlaceholders: boolean;
    withSocialPostPlaceholders: boolean;
    withStoryBookmarkPlaceholders: boolean;
    withStoryEmbedPlaceholders: boolean;
    withVideoPlaceholders: boolean;
    withWebBookmarkPlaceholders: boolean;
}

export function removeDisabledPlaceholders({
    withAttachmentPlaceholders,
    withContactPlaceholders,
    withCoveragePlaceholders,
    withImagePlaceholders,
    withInlineContactPlaceholders,
    withGalleryPlaceholders,
    withGalleryBookmarkPlaceholders,
    withEmbedPlaceholders,
    withMediaPlaceholders,
    withSocialPostPlaceholders,
    withStoryBookmarkPlaceholders,
    withStoryEmbedPlaceholders,
    withVideoPlaceholders,
    withWebBookmarkPlaceholders,
}: Parameters): Normalize {
    const config = {
        [PlaceholderNode.Type.ATTACHMENT]: withAttachmentPlaceholders,
        [PlaceholderNode.Type.CONTACT]: withContactPlaceholders || withInlineContactPlaceholders,
        [PlaceholderNode.Type.COVERAGE]: withCoveragePlaceholders,
        [PlaceholderNode.Type.IMAGE]: withImagePlaceholders,
        [PlaceholderNode.Type.GALLERY]: withGalleryPlaceholders,
        [PlaceholderNode.Type.GALLERY_BOOKMARK]: withGalleryBookmarkPlaceholders,
        [PlaceholderNode.Type.EMBED]: withEmbedPlaceholders,
        [PlaceholderNode.Type.MEDIA]: withMediaPlaceholders,
        [PlaceholderNode.Type.SOCIAL_POST]: withSocialPostPlaceholders,
        [PlaceholderNode.Type.STORY_BOOKMARK]: withStoryBookmarkPlaceholders,
        [PlaceholderNode.Type.STORY_EMBED]: withStoryEmbedPlaceholders,
        [PlaceholderNode.Type.VIDEO]: withVideoPlaceholders,
        [PlaceholderNode.Type.WEB_BOOKMARK]: withWebBookmarkPlaceholders,
    };

    const allowedTypes: PlaceholderNode.Type[] = Object.entries(config)
        .filter(([_, enabled]) => enabled)
        .map(([type]) => type as PlaceholderNode.Type);

    return (editor, [node, path]) => {
        if (
            PlaceholderNode.isPlaceholderNode(node) &&
            !PlaceholderNode.isPlaceholderNode(node, allowedTypes)
        ) {
            Transforms.removeNodes(editor, { at: path });
            return true;
        }
        return false;
    };
}
