import { GalleryNode, isGalleryNode } from '@prezly/slate-types';
import { pick } from 'lodash';
import { Editor, Node, Transforms } from 'slate';

const updateGallery = (
    editor: Editor,
    changes: Partial<Pick<GalleryNode, 'images' | 'layout' | 'padding' | 'thumbnail_size'>>,
) => {
    /**
     * The `Partial<Node>` type-cast is a temporary solution until `Transforms.setNodes()` spec is fixed.
     * @see https://github.com/ianstormtaylor/slate/pull/4638
     * TODO: Remove the type-cast once the patch is released with the next Slate update.
     */
    const changedAttributes = pick(changes, [
        'images',
        'layout',
        'padding',
        'thumbnail_size',
    ]) as Partial<Node>;

    Transforms.setNodes<GalleryNode>(editor, changedAttributes, {
        match: isGalleryNode,
    });
};

export default updateGallery;
