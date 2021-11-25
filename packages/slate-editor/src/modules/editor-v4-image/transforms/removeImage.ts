import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

const removeImage = (editor: Editor): ImageNode | null =>
    EditorCommands.removeNode<ImageNode>(editor, {
        match: isImageNode,
    });

export default removeImage;
