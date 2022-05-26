import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeImage(editor: Editor, image?: ImageNode): ImageNode | null {
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
