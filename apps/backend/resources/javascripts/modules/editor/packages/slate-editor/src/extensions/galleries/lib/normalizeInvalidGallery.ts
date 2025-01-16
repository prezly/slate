import { isGalleryNode, validateGalleryNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

export function normalizeInvalidGallery(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (isGalleryNode(node) && !validateGalleryNode(node)) {
        editor.tf.removeNodes({ at: path });
        return true;
    }

    return false;
}
