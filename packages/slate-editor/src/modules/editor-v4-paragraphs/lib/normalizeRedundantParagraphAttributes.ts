import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import createParagraph from './createParagraph';

const ALLOWED_ATTRIBUTES = Object.keys(createParagraph());

const normalizeRedundantParagraphAttributes = (
    editor: Editor,
    [node, path]: NodeEntry,
): boolean => {
    if (!EditorCommands.isParagraphElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantParagraphAttributes;
