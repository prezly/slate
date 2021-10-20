import { Editor, Transforms } from 'slate';

import { MentionElementType } from '../types';

const insertMention = (editor: Editor, element: MentionElementType) => {
    Transforms.insertNodes(editor, element);
    Transforms.move(editor);
};

export default insertMention;
