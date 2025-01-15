import type { CoverageEntry } from '@prezly/sdk';
import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate';

import { createCoverage } from './createCoverage';

export function insertCoverage(editor: SlateEditor, coverageId: CoverageEntry['id']): void {
    return EditorCommands.insertNodes(editor, [createCoverage(coverageId)], {
        ensureEmptyParagraphAfter: true,
    });
}
