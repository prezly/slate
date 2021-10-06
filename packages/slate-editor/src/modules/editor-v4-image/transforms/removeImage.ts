import { EditorCommands } from '@prezly/slate-commons';
import { ImageNode, isImageNode } from '@prezly/slate-types';
import { Editor } from 'slate';

const removeImage = (editor: Editor): ImageNode | null =>
    EditorCommands.removeNode<ImageNode>(editor, {
        match: isImageNode,
    });

export default removeImage;
