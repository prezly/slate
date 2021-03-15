import { Editor, Transforms } from 'slate';

import { MentionElementType } from '../types';

const insertMention = <T extends string>(editor: Editor, element: MentionElementType<T>) => {
    Transforms.insertNodes(editor, element);
    Transforms.move(editor);
};

export default insertMention;
