import uuidV4 from 'uuid/v4';

import { GALLERY_TYPE } from '../constants';
import { GalleryElementType, GalleryImageSize, GalleryLayout, GalleryPadding } from '../types';

type Options = Partial<Pick<GalleryElementType, 'layout' | 'padding' | 'thumbnail_size'>>;

const createGallery = (
    images: GalleryElementType['images'],
    {
        layout = GalleryLayout.CONTAINED,
        padding = GalleryPadding.M,
        thumbnail_size = GalleryImageSize.M,
    }: Options = {},
): GalleryElementType => ({
    children: [{ text: '' }],
    images,
    layout,
    padding,
    thumbnail_size,
    type: GALLERY_TYPE,
    uuid: uuidV4(),
});

export default createGallery;
