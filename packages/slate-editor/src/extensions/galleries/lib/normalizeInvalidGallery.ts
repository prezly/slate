import { isGalleryNode, validateGalleryNode } from '@prezly/slate-types';
import type { Editor, Node, NodeEntry } from 'slate';
import { Transforms } from 'slate';

export function normalizeInvalidGallery(editor: Editor, [node, path]: NodeEntry<Node>): boolean {
    if (isGalleryNode(node) && !validateGalleryNode(node)) {
        Transforms.removeNodes(editor, { at: path });
        return true;
    }

    return false;
}
