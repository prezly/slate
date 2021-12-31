import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { Editor, Location } from 'slate';
import { Transforms } from 'slate';

function createEmptyParagraph(): ParagraphNode {
    return {
        children: [{ text: '' }],
        type: PARAGRAPH_NODE_TYPE,
    };
}

function insertEmptyParagraph(editor: Editor, at?: Location): void {
    // Using `mode: 'highest' under assumption that "paragraph" can only be
    // at the root of the document.
    Transforms.insertNodes(editor, [createEmptyParagraph()], { at, mode: 'highest' });
}

export default insertEmptyParagraph;
