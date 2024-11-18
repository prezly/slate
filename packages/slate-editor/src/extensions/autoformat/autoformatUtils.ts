// import { isElementNode } from '@prezly/slate-types';
// import { getParent } from '@udecode/plate-core';
import type { Editor } from 'slate';

// TODO: Fix this
export function format(editor: Editor, _: () => void) {
    if (editor.selection) {
        // const parentEntry = getParent(editor, editor.selection);
        // if (!parentEntry) return;
        return;
        // const [node] = parentEntry;
        // if (isElementNode(node)) {
        //     customFormatting();
        // }
    }
}

export function formatText(editor: Editor, text: string) {
    format(editor, () => editor.insertText(text));
}
