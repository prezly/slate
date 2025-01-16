import { type Editor, type NodeEntry } from '@udecode/plate';

export function insertTextNode(editor: Editor, [node, path]: NodeEntry) {
    editor.tf.insertNodes([{ text: '' }], { at: path, match: (n) => n === node });
    return true;
}
