import { Transforms } from 'slate';
import type { NodeEntry } from 'slate';
import type { Editor } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

export function insertParagraph(editor: Editor, [node, path]: NodeEntry) {
    Transforms.insertNodes(editor, [createParagraph()], { at: path, match: (n) => n === node });
    return true;
}
