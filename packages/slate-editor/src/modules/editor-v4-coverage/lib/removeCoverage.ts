import { EditorCommands } from '@prezly/slate-commons';
import type { CoverageNode } from '@prezly/slate-types';
import { isCoverageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

const removeCoverage = (editor: Editor): CoverageNode | null =>
    EditorCommands.removeNode<CoverageNode>(editor, {
        match: isCoverageNode,
    });

export default removeCoverage;
