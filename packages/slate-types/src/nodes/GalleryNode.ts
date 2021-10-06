import { UploadcareImageStoragePayload, isPrezlyStoragePayload } from '../sdk';

import ElementNode, { isElementNode } from './ElementNode';

export const GALLERY_NODE_TYPE = 'gallery';

export enum GalleryLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export enum GalleryImageSize {
    L = 'L',
    M = 'M',
    S = 'S',
    XL = 'XL',
    XS = 'XS',
}

export enum GalleryPadding {
    L = 'L',
    M = 'M',
    S = 'S',
}

const LAYOUTS = [GalleryLayout.CONTAINED, GalleryLayout.EXPANDED, GalleryLayout.FULL_WIDTH];

const PADDINGS = [GalleryPadding.S, GalleryPadding.M, GalleryPadding.L];

const THUMBNAIL_SIZES = [
    GalleryImageSize.XS,
    GalleryImageSize.S,
    GalleryImageSize.M,
    GalleryImageSize.L,
    GalleryImageSize.XL,
];

export default interface GalleryNode extends ElementNode<typeof GALLERY_NODE_TYPE> {
    images: {
        /** empty string if no caption */
        caption: string;
        file: UploadcareImageStoragePayload;
    }[];
    layout: 'contained' | 'expanded' | 'full-width';
    padding: 'S' | 'M' | 'L';
    thumbnail_size: 'XS' | 'S' | 'M' | 'L' | 'XL';
    uuid: string;
}

export interface GalleryImage {
    /** empty string if no caption */
    caption: string;
    file: UploadcareImageStoragePayload;
}

const isGalleryImage = (image: any): image is GalleryImage =>
    typeof image === 'object' &&
    image !== null &&
    typeof image.caption === 'string' &&
    isPrezlyStoragePayload(image.file);

export const isGalleryNode = (value: any): value is GalleryNode => {
    return (
        isElementNode(value) &&
        value.type === GALLERY_NODE_TYPE &&
        Array.isArray(value.images) &&
        value.images.length > 0 &&
        value.images.every(isGalleryImage) &&
        LAYOUTS.includes(value.layout as any) &&
        PADDINGS.includes(value.padding as any) &&
        THUMBNAIL_SIZES.includes(value.thumbnail_size as any) &&
        typeof value.uuid === 'string' &&
        value.uuid.length > 0
    );
};
