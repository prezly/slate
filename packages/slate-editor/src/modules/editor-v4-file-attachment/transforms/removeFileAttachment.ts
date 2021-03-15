import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { isFileAttachmentElement } from '../lib';
import { FileAttachmentElementType } from '../types';

const removeFileAttachment = (editor: Editor): FileAttachmentElementType | null =>
    EditorCommands.removeNode<FileAttachmentElementType>(editor, {
        match: isFileAttachmentElement,
    });

export default removeFileAttachment;
