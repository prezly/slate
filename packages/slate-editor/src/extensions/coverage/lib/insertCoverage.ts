import type { CoverageEntry } from '@prezly/sdk';
import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { createCoverage } from './createCoverage';

export function insertCoverage(editor: Editor, coverageId: CoverageEntry['id']): void {
    return EditorCommands.insertNodes(editor, [createCoverage(coverageId)], {
        ensureEmptyParagraphAfter: true,
    });
}
