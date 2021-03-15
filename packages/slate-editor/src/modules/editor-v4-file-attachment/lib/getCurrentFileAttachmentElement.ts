import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { FileAttachmentElementType } from '../types';

import isFileAttachmentElement from './isFileAttachmentElement';

const getCurrentFileAttachmentElement = (editor: Editor): FileAttachmentElementType | null => {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];
    if (currentNode && isFileAttachmentElement(currentNode)) {
        return currentNode;
    }
    return null;
};

export default getCurrentFileAttachmentElement;
