import { pick } from 'lodash';
import { Editor, Transforms } from 'slate';

import { isGalleryElement } from '../lib';
import { GalleryElementType } from '../types';

const updateGallery = (
    editor: Editor,
    changes: Partial<Pick<GalleryElementType, 'images' | 'layout' | 'padding' | 'thumbnail_size'>>,
) => {
    const changedAtrributes = pick(changes, ['images', 'layout', 'padding', 'thumbnail_size']);

    Transforms.setNodes(editor, changedAtrributes, {
        match: isGalleryElement,
    });
};

export default updateGallery;
