import { Editor } from 'slate';

import { EventsEditor } from 'modules/editor-v4-events';
import { ImageElementType } from 'modules/editor-v4-image';

const handleRemoveImage = (editor: Editor, removedElement: ImageElementType): void => {
    EventsEditor.dispatchEvent(editor, 'image-removed', { uuid: removedElement.file.uuid });
};

export default handleRemoveImage;
