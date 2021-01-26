import { GalleryNode } from '@prezly/slate-types';

export const DEFAULT_MAX_VIEWPORT_WIDTH = 800;

export const IMAGE_PADDING: Record<GalleryNode['padding'], number> = {
    S: 0,
    M: 2,
    L: 8,
};

export const IMAGE_SIZE: Record<GalleryNode['thumbnail_size'], number> = {
    XS: 90,
    S: 200,
    M: 300,
    L: 450,
    XL: 1000,
};
