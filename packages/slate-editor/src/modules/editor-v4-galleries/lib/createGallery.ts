import {
    GalleryImageSize,
    GalleryLayout,
    GalleryNode,
    GalleryPadding,
    GALLERY_NODE_TYPE,
} from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

type Options = Partial<Pick<GalleryNode, 'layout' | 'padding' | 'thumbnail_size'>>;

const createGallery = (
    images: GalleryNode['images'],
    {
        layout = GalleryLayout.CONTAINED,
        padding = GalleryPadding.M,
        thumbnail_size = GalleryImageSize.M,
    }: Options = {},
): GalleryNode => ({
    children: [{ text: '' }],
    images,
    layout,
    padding,
    thumbnail_size,
    type: GALLERY_NODE_TYPE,
    uuid: uuidV4(),
});

export default createGallery;
