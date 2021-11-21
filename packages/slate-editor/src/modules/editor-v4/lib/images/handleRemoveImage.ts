import type { ImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

import { EventsEditor } from '../../../../modules/editor-v4-events';

const handleRemoveImage = (editor: Editor, removedElement: ImageNode): void => {
    EventsEditor.dispatchEvent(editor, 'image-removed', { uuid: removedElement.file.uuid });
};

export default handleRemoveImage;
