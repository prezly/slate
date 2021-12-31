import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { createDivider } from '../../../../modules/editor-v4-divider';

function insertDivider(editor: Editor): void {
    return EditorCommands.insertNodes(editor, [createDivider()], {
        ensureEmptyParagraphAfter: true,
    });
}

export default insertDivider;
