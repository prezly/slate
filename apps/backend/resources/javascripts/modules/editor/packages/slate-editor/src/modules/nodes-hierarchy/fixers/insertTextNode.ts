import { Transforms } from 'slate';
import type { NodeEntry } from 'slate';
import type { Editor } from 'slate';

export function insertTextNode(editor: Editor, [node, path]: NodeEntry) {
    Transforms.insertNodes(editor, [{ text: '' }], { at: path, match: (n) => n === node });
    return true;
}
