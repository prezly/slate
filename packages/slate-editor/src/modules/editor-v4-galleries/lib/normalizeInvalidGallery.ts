import { EditorCommands } from '@prezly/slate-commons';
import { GALLERY_NODE_TYPE, GalleryNode, isGalleryNode } from '@prezly/slate-types';
import { Editor, Node, NodeEntry, Transforms } from 'slate';

// We cannot use `isGalleryNode` here, because it checks for `images` array length.
const isGalleryNodeType = (node: any): node is GalleryNode =>
    EditorCommands.isElementWithType(node) && node.type === GALLERY_NODE_TYPE;

const normalizeInvalidGallery = (editor: Editor, [node, path]: NodeEntry<Node>): boolean => {
    if (!isGalleryNodeType(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    if (!isGalleryNode(node)) {
        Transforms.removeNodes(editor, { at: path });
        return true;
    }

    return false;
};

export default normalizeInvalidGallery;
