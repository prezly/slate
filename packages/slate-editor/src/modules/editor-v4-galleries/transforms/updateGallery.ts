import { GalleryNode, isGalleryNode } from '@prezly/slate-types';
import { pick } from 'lodash';
import { Editor, Transforms } from 'slate';

const updateGallery = (
    editor: Editor,
    changes: Partial<Pick<GalleryNode, 'images' | 'layout' | 'padding' | 'thumbnail_size'>>,
) => {
    const changedAtrributes = pick(changes, ['images', 'layout', 'padding', 'thumbnail_size']);

    Transforms.setNodes<GalleryNode>(editor, changedAtrributes, {
        match: isGalleryNode,
    });
};

export default updateGallery;
