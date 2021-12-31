import type { ImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

import { EventsEditor } from '../../../../modules/editor-v4-events';

function handleRemoveImage(editor: Editor, removedElement: ImageNode): void {
    return EventsEditor.dispatchEvent(editor, 'image-removed', { uuid: removedElement.file.uuid });
}

export default handleRemoveImage;
