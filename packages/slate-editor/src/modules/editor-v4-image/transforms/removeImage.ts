import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeImage(editor: Editor): ImageNode | null {
    return EditorCommands.removeNode<ImageNode>(editor, {
        match: isImageNode,
    });
}
