import { UploadedImage, isUploadedImage } from '@prezly/uploads';
import { isPlainObject } from 'is-plain-object';

import { ElementNode, isElementNode } from './ElementNode';
import { isArrayOf, isEnum, isUuid } from './validation';

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
    return isPlainObject(image) && typeof image.caption === 'string' && isUploadedImage(image.file);
}

export function validateGalleryNode(node: Partial<GalleryNode> | undefined): node is GalleryNode {
    return (
        node !== undefined &&
        isPlainObject(node) &&
        node.type === GALLERY_NODE_TYPE &&
        isUuid(node.uuid) &&
        isEnum(node.layout, GalleryLayout) &&
        isEnum(node.padding, GalleryPadding) &&
        isEnum(node.thumbnail_size, GalleryImageSize) &&
        isArrayOf(node.images, validateGalleryImage)
    );
}
