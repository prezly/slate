import type { GalleryNode } from '@prezly/slate-types';
import { isGalleryNode } from '@prezly/slate-types';
import { pick } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';

export function updateGallery(
    editor: SlateEditor,
    changes: Partial<Pick<GalleryNode, 'images' | 'layout' | 'padding' | 'thumbnail_size'>>,
) {
    const changedAttributes = pick(changes, ['images', 'layout', 'padding', 'thumbnail_size']);

    editor.setNodes<GalleryNode>(changedAttributes, {
        match: isGalleryNode,
    });
}
