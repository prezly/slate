import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

export function removeImage(editor: SlateEditor, image?: ImageNode): ImageNode | null {
    if (image === undefined) {
        // Remove images from current selection
        return EditorCommands.removeNode<ImageNode>(editor, { match: isImageNode });
    }

    // Remove the specific image node
    return EditorCommands.removeNode<ImageNode>(editor, {
        at: [],
        match: (node) => node === image,
    });
}
