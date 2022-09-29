import type { Normalize } from '@prezly/slate-commons';
import { Transforms } from 'slate';

import { PlaceholderNode } from '../PlaceholderNode';

interface Parameters {
    withAttachmentPlaceholders: boolean;
    withContactPlaceholders: boolean;
    withImagePlaceholders: boolean;
    withGalleryPlaceholders: boolean;
    withEmbedPlaceholders: boolean;
    withSocialPostPlaceholders: boolean;
    withVideoPlaceholders: boolean;
    withWebBookmarkPlaceholders: boolean;
}

export function removeDisabledPlaceholders({
    withAttachmentPlaceholders,
    withContactPlaceholders,
    withImagePlaceholders,
    withGalleryPlaceholders,
    withEmbedPlaceholders,
    withSocialPostPlaceholders,
    withVideoPlaceholders,
    withWebBookmarkPlaceholders,
}: Parameters): Normalize {
    const config = {
        [PlaceholderNode.Type.ATTACHMENT]: withAttachmentPlaceholders,
        [PlaceholderNode.Type.CONTACT]: withContactPlaceholders,
        [PlaceholderNode.Type.IMAGE]: withImagePlaceholders,
        [PlaceholderNode.Type.GALLERY]: withGalleryPlaceholders,
        [PlaceholderNode.Type.EMBED]: withEmbedPlaceholders,
        [PlaceholderNode.Type.SOCIAL_POST]: withSocialPostPlaceholders,
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
