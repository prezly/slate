import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

export function insertParagraph(editor: SlateEditor, [node, path]: NodeEntry) {
    editor.insertNodes([createParagraph()], { at: path, match: (n) => n === node });
    return true;
}
