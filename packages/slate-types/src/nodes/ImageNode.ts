import { Element } from 'slate';

import { UploadcareImageStoragePayload } from '../sdk';

export const IMAGE_NODE_TYPE = 'image-block';

export enum ImageLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export default interface ImageNode extends Element {
    type: typeof IMAGE_NODE_TYPE;
    /** caption */
    file: UploadcareImageStoragePayload;
    /** empty string if no URL */
    href: string;
    layout: ImageLayout;
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width: string;
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width_factor: string;
}

export const isImageNode = (value: any): value is ImageNode =>
    Element.isElementType(value, IMAGE_NODE_TYPE);
