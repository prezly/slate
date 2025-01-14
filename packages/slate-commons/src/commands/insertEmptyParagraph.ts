import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { Location } from 'slate';

function createEmptyParagraph(): ParagraphNode {
    return {
        children: [{ text: '' }],
        type: PARAGRAPH_NODE_TYPE,
    };
}

export function insertEmptyParagraph(
    editor: SlateEditor,
    options: { at?: Location; select?: boolean } = {},
): void {
    // Using `mode: 'highest' under assumption that "paragraph" can only be
    // at the root of the document.
    editor.insertNodes([createEmptyParagraph()], { ...options, mode: 'highest' });
}
