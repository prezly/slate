import { EditorCommands } from '@prezly/slate-commons';
import { isParagraphNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import createParagraph from './createParagraph';

const ALLOWED_ATTRIBUTES = Object.keys(createParagraph());

function normalizeRedundantParagraphAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (!isParagraphNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
}

export default normalizeRedundantParagraphAttributes;
