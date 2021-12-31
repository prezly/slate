import type { Editor } from 'slate';
import { Transforms } from 'slate';

import type { MentionElementType } from '../types';

function insertMention(editor: Editor, element: MentionElementType) {
    Transforms.insertNodes(editor, element);
    Transforms.move(editor);
}

export default insertMention;
