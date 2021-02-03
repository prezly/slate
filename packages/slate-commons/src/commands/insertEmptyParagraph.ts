import { Editor, Element, Location, Transforms } from 'slate';

import { PARAGRAPH_TYPE } from '../constants';

const createEmptyParagraph = (): Element => ({
    children: [{ text: '' }],
    type: PARAGRAPH_TYPE,
});

const insertEmptyParagraph = (editor: Editor, at?: Location): void => {
    // Using `mode: 'highest' under assumption that "paragraph" can only be
    // at the root of the document.
    Transforms.insertNodes(editor, [createEmptyParagraph()], { at, mode: 'highest' });
};

export default insertEmptyParagraph;
