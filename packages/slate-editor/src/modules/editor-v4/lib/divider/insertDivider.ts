import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { createDivider } from 'modules/editor-v4-divider';

const insertDivider = (editor: Editor): void => {
    EditorCommands.insertNodes(editor, [createDivider()], { ensureEmptyParagraphAfter: true });
};

export default insertDivider;
