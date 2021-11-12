import { isGalleryNode } from '@prezly/slate-types';
import { Editor, Node, NodeEntry, Transforms } from 'slate';

export default function normalizeInvalidGallery(editor: Editor, [node, path]: NodeEntry<Node>): boolean {
    if (!isGalleryNode(node)) {
        Transforms.removeNodes(editor, { at: path });
        return true;
    }

    return false;
}
