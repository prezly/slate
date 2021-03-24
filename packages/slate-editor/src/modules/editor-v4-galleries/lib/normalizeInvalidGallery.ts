import { Editor, Element, Node, NodeEntry, Transforms } from 'slate';

import { GALLERY_TYPE } from '../constants';
import { GalleryElementType } from '../types';

import isGalleryElement from './isGalleryElement';

// We cannot use `isGalleryElement` here, because it checks for `images` array length.
const isGalleryElementType = (node: any): node is GalleryElementType =>
    Element.isElement(node) && node.type === GALLERY_TYPE;

const normalizeInvalidGallery = (editor: Editor, [node, path]: NodeEntry<Node>): boolean => {
    if (!isGalleryElementType(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    if (!isGalleryElement(node)) {
        Transforms.removeNodes(editor, { at: path });
        return true;
    }

    return false;
};

export default normalizeInvalidGallery;
