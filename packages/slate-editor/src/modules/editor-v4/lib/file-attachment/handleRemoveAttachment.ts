import { Editor } from 'slate';

import { EventsEditor } from 'modules/editor-v4-events';
import { FileAttachmentElementType } from 'modules/editor-v4-file-attachment';

const handleRemoveAttachment = (editor: Editor, element: FileAttachmentElementType): void => {
    EventsEditor.dispatchEvent(editor, 'attachment-removed', { uuid: element.file.uuid });
};

export default handleRemoveAttachment;
