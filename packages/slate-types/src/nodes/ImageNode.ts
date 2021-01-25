import { isPrezlyStoragePayload, UploadcareImageStoragePayload } from '../sdk';

import ElementNode, { isElementNode } from './ElementNode';
import InlineNode from './InlineNode';

export const IMAGE_NODE_TYPE = 'image-block';

const LAYOUTS = ['contained', 'expanded', 'full-width'];

export default interface ImageNode extends ElementNode<typeof IMAGE_NODE_TYPE> {
    /** caption */
    children: InlineNode[];
    file: UploadcareImageStoragePayload;
    /** empty string if no URL */
    href: string;
    layout: 'contained' | 'expanded' | 'full-width';
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width: string;
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width_factor: string;
}

export const isImageNode = (value: any): value is ImageNode =>
    isElementNode(value) &&
    value.type === IMAGE_NODE_TYPE &&
    isPrezlyStoragePayload(value.file) &&
    typeof value.href === 'string' &&
    LAYOUTS.includes(value.layout as any) &&
    typeof value.width === 'string' &&
    value.width.length > 1 &&
    typeof value.width_factor === 'string' &&
    value.width_factor.length > 1;
