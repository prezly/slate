import { AttachmentNode } from '@prezly/slate-types';
import { Editor } from 'slate';

import { EventsEditor } from '../../../../modules/editor-v4-events';

const handleRemoveAttachment = (editor: Editor, element: AttachmentNode): void => {
    EventsEditor.dispatchEvent(editor, 'attachment-removed', { uuid: element.file.uuid });
};

export default handleRemoveAttachment;
