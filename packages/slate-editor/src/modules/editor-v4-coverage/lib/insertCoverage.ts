import type { Coverage } from '@prezly/sdk';
import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import createCoverage from './createCoverage';

function insertCoverage(editor: Editor, coverageId: Coverage['id']): void {
    return EditorCommands.insertNodes(editor, [createCoverage(coverageId)], {
        ensureEmptyParagraphAfter: true,
    });
}

export default insertCoverage;
