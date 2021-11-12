import { GalleryNode, isGalleryNode } from '@prezly/slate-types';
import { pick } from 'lodash';
import { Editor, Transforms } from 'slate';

const updateGallery = (
    editor: Editor,
    changes: Partial<Pick<GalleryNode, 'images' | 'layout' | 'padding' | 'thumbnail_size'>>,
) => {
    const changedAttributes = pick(changes, ['images', 'layout', 'padding', 'thumbnail_size']);

    Transforms.setNodes<GalleryNode>(editor, changedAttributes, {
        match: isGalleryNode,
    });
};

export default updateGallery;
