import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { isImageElement } from '../lib';
import { ImageElementType } from '../types';

const removeImage = (editor: Editor): ImageElementType | null =>
    EditorCommands.removeNode<ImageElementType>(editor, {
        match: isImageElement,
    });

export default removeImage;
