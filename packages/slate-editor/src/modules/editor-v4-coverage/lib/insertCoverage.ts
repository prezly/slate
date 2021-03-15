import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { Coverage } from 'types';

import createCoverage from './createCoverage';

const insertCoverage = (editor: Editor, coverageId: Coverage['id']): void => {
    EditorCommands.insertNodes(editor, [createCoverage(coverageId)], {
        ensureEmptyParagraphAfter: true,
    });
};

export default insertCoverage;
