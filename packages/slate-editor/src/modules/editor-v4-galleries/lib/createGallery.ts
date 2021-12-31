import type { GalleryNode } from '@prezly/slate-types';
import {
    GalleryImageSize,
    GalleryLayout,
    GalleryPadding,
    GALLERY_NODE_TYPE,
} from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

type Options = Partial<Pick<GalleryNode, 'layout' | 'padding' | 'thumbnail_size'>>;

function createGallery(
    images: GalleryNode['images'],
    {
        layout = GalleryLayout.CONTAINED,
        padding = GalleryPadding.M,
        thumbnail_size = GalleryImageSize.M,
    }: Options = {},
): GalleryNode {
    return {
        children: [{ text: '' }],
        images,
        layout,
        padding,
        thumbnail_size,
        type: GALLERY_NODE_TYPE,
        uuid: uuidV4(),
    };
}

export default createGallery;
