import type { NodeEntry, SlateEditor } from '@udecode/plate';

import { createParagraph } from '#extensions/paragraphs';

export function insertParagraph(editor: SlateEditor, [node, path]: NodeEntry) {
    editor.tf.insertNodes([createParagraph()], { at: path, match: (n) => n === node });
    return true;
}
