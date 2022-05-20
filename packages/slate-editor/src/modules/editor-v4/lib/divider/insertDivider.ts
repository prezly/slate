import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { createDivider } from '#extensions/editor-v4-divider';

export function insertDivider(editor: Editor): void {
    return EditorCommands.insertNodes(editor, [createDivider()], {
        ensureEmptyParagraphAfter: true,
    });
}
