import type { SlateEditor, TNodeEntry } from '@udecode/plate-common';

import { createParagraph } from '#extensions/paragraphs';

export function insertParagraph(editor: SlateEditor, [node, path]: TNodeEntry) {
    editor.insertNodes([createParagraph()], { at: path, match: (n) => n === node });
    return true;
}
