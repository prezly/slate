import { UploadcareImage } from '@prezly/uploadcare';
import { Element } from 'slate';

import { IMAGE_TYPE } from '../constants';
import { ImageElementType, ImageLayout } from '../types';

const isImageElement = (node: any): node is ImageElementType =>
    Element.isElement(node) &&
    node.type === IMAGE_TYPE &&
    UploadcareImage.isPrezlyStoragePayload(node.file) &&
    typeof node.href === 'string' &&
    Object.values(ImageLayout).includes(node.layout as any) &&
    typeof node.width === 'string' &&
    node.width.length > 1 &&
    typeof node.width_factor === 'string' &&
    node.width_factor.length > 1;

export default isImageElement;
