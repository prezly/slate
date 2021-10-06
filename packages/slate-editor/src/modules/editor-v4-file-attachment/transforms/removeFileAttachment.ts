import { EditorCommands } from '@prezly/slate-commons';
import { AttachmentNode, isAttachmentNode } from '@prezly/slate-types';
import { Editor } from 'slate';

const removeFileAttachment = (editor: Editor): AttachmentNode | null =>
    EditorCommands.removeNode<AttachmentNode>(editor, {
        match: isAttachmentNode,
    });

export default removeFileAttachment;
