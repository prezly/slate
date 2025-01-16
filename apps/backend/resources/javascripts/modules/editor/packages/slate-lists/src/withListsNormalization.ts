import type { SlateEditor } from '@udecode/plate';

import { normalizeNode } from './normalizeNode';

export function withListsNormalization<T extends SlateEditor>(editor: T): T {
    const parent = { normalizeNode: editor.normalizeNode };
    editor.normalizeNode = (entry, options) => {
        return normalizeNode(editor, entry) || parent.normalizeNode(entry, options);
    };
    return editor;
}
