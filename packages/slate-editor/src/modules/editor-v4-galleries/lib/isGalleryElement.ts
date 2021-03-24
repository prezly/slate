import { Element, Node } from 'slate';

import { GALLERY_TYPE } from '../constants';
import { GalleryElementType, GalleryImageSize, GalleryLayout, GalleryPadding } from '../types';

import isGalleryImage from './isGalleryImage';

const isGalleryElement = (node: Node): node is GalleryElementType =>
    Element.isElement(node) &&
    node.type === GALLERY_TYPE &&
    Array.isArray(node.images) &&
    node.images.length > 0 &&
    node.images.every(isGalleryImage) &&
    Object.values(GalleryLayout).includes(node.layout as any) &&
    Object.values(GalleryPadding).includes(node.padding as any) &&
    Object.values(GalleryImageSize).includes(node.thumbnail_size as any) &&
    typeof node.uuid === 'string' &&
    node.uuid.length > 0;

export default isGalleryElement;
