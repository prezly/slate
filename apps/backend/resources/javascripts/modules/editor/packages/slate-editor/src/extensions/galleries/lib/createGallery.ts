import type { GalleryNode } from '@prezly/slate-types';
import {
    GalleryImageSize,
    GalleryLayout,
    GalleryPadding,
    GALLERY_NODE_TYPE,
} from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

export function createGallery(
    props: Partial<Pick<GalleryNode, 'images' | 'padding' | 'thumbnail_size' | 'layout'>>,
): GalleryNode {
    const {
        images = [],
        layout = GalleryLayout.CONTAINED,
        padding = GalleryPadding.M,
        thumbnail_size = GalleryImageSize.M,
    } = props;
    return {
        type: GALLERY_NODE_TYPE,
        uuid: uuidV4(),
        children: [{ text: '' }],
        images,
        layout,
        padding,
        thumbnail_size,
    };
}
