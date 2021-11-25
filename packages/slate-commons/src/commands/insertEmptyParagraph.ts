import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { Editor, Location } from 'slate';
import { Transforms } from 'slate';

const createEmptyParagraph = (): ParagraphNode => ({
    children: [{ text: '' }],
    type: PARAGRAPH_NODE_TYPE,
});

const insertEmptyParagraph = (editor: Editor, at?: Location): void => {
    // Using `mode: 'highest' under assumption that "paragraph" can only be
    // at the root of the document.
    Transforms.insertNodes(editor, [createEmptyParagraph()], { at, mode: 'highest' });
};

export default insertEmptyParagraph;
