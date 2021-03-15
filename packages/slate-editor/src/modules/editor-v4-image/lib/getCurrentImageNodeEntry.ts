import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import { ImageElementType } from '../types';

import isImageElement from './isImageElement';

const getCurrentImageNodeEntry = (editor: Editor): NodeEntry<ImageElementType> | null => {
    const currentNodeEntry = EditorCommands.getCurrentNodeEntry(editor);
    if (currentNodeEntry && isImageElement(currentNodeEntry[0])) {
        return currentNodeEntry as NodeEntry<ImageElementType>;
    }

    return null;
};

export default getCurrentImageNodeEntry;
