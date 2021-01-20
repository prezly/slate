import { UploadcareImageStoragePayload, isPrezlyStoragePayload } from '../sdk';

import ElementNode, { isElementNode } from './ElementNode';

export const GALLERY_NODE_TYPE = 'gallery';

const LAYOUTS = ['contained', 'expanded', 'full-width'];

const PADDINGS = ['S', 'M', 'L'];

const THUMBNAIL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default interface GalleryNode extends ElementNode {
    images: {
        /** empty string if no caption */
        caption: string;
        file: UploadcareImageStoragePayload;
    }[];
    layout: 'contained' | 'expanded' | 'full-width';
    padding: 'S' | 'M' | 'L';
    thumbnail_size: 'XS' | 'S' | 'M' | 'L' | 'XL';
    type: typeof GALLERY_NODE_TYPE;
    uuid: string;
}

export const isGalleryNode = (value: any): value is GalleryNode => {
    return (
        isElementNode(value) &&
        value.type === GALLERY_NODE_TYPE &&
        Array.isArray(value.images) &&
        value.images.length > 0 &&
        value.images.every((image) => {
            return (
                typeof image === 'object' &&
                image !== null &&
                typeof image.caption === 'string' &&
                isPrezlyStoragePayload(image.file)
            );
        }) &&
        LAYOUTS.includes(value.layout as any) &&
        PADDINGS.includes(value.padding as any) &&
        THUMBNAIL_SIZES.includes(value.thumbnail_size as any) &&
        typeof value.uuid === 'string' &&
        value.uuid.length > 0
    );
};
