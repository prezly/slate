import type { UploadedImage } from '@prezly/uploads';
import { isUploadedImage } from '@prezly/uploads';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import { isArrayOf, isEnum, isObject, isUuid } from './validation';

export const GALLERY_NODE_TYPE = 'gallery';

export enum GalleryLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export enum GalleryImageSize {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
}

export enum GalleryPadding {
    S = 'S',
    M = 'M',
    L = 'L',
}

export interface GalleryNode extends ElementNode {
    type: typeof GALLERY_NODE_TYPE;
    images: GalleryImage[];
    layout: GalleryLayout;
    padding: GalleryPadding;
    thumbnail_size: GalleryImageSize;
    uuid: string;
}

export interface GalleryImage {
    /** empty string if no caption */
    caption: string;
    file: UploadedImage;
}

export function isGalleryNode(value: any): value is GalleryNode {
    return isElementNode<GalleryNode>(value, GALLERY_NODE_TYPE);
}

function validateGalleryImage(image: Partial<GalleryImage> | undefined): image is GalleryImage {
    return isObject(image) && typeof image.caption === 'string' && isUploadedImage(image.file);
}

export function validateGalleryNode(node: Partial<GalleryNode> | undefined): node is GalleryNode {
    return (
        node !== undefined &&
        isObject(node) &&
        node.type === GALLERY_NODE_TYPE &&
        isUuid(node.uuid) &&
        isEnum(node.layout, GalleryLayout) &&
        isEnum(node.padding, GalleryPadding) &&
        isEnum(node.thumbnail_size, GalleryImageSize) &&
        isArrayOf(node.images, validateGalleryImage)
    );
}
