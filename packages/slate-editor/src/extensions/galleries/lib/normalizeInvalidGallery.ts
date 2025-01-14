import { isGalleryNode, validateGalleryNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { Node, NodeEntry } from 'slate';

export function normalizeInvalidGallery(
    editor: SlateEditor,
    [node, path]: NodeEntry<Node>,
): boolean {
    if (isGalleryNode(node) && !validateGalleryNode(node)) {
        editor.removeNodes({ at: path });
        return true;
    }

    return false;
}
