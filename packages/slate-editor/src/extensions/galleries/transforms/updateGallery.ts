import type { GalleryNode } from '@prezly/slate-types';
import { isGalleryNode } from '@prezly/slate-types';
import { pick } from '@technically/lodash';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateGallery(
    editor: Editor,
    changes: Partial<Pick<GalleryNode, 'images' | 'layout' | 'padding' | 'thumbnail_size'>>,
) {
    const changedAttributes = pick(changes, ['images', 'layout', 'padding', 'thumbnail_size']);

    Transforms.setNodes<GalleryNode>(editor, changedAttributes, {
        match: isGalleryNode,
    });
}
