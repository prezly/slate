import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate';

import { createDivider } from '#extensions/divider';

export function insertDivider(editor: SlateEditor): void {
    return EditorCommands.insertNodes(editor, [createDivider()], {
        ensureEmptyParagraphAfter: true,
    });
}
