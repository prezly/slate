import type { UploadedImage } from '@prezly/uploads';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import type { Alignable, Alignment } from './interfaces';

export const IMAGE_NODE_TYPE = 'image-block';

export enum ImageLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export type ImageWidth = `${number}%` | `${number}px`;

export interface ImageNode extends ElementNode, Alignable {
    type: typeof IMAGE_NODE_TYPE;
    /** caption */
    file: UploadedImage;
    /** empty string if no URL */
    href: string;
    layout: ImageLayout;
    align: Alignment;
    new_tab: boolean;
    width: ImageWidth;
}

export function isImageNode(value: any): value is ImageNode {
    return isElementNode<ImageNode>(value, IMAGE_NODE_TYPE);
}
