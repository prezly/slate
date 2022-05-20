import { EditorCommands } from '@prezly/slate-commons';
import type { CoverageNode } from '@prezly/slate-types';
import { isCoverageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeCoverage(editor: Editor, coverage?: CoverageNode): CoverageNode | null {
    return EditorCommands.removeNode<CoverageNode>(editor, {
        match: coverage ? (node) => node === coverage : isCoverageNode,
    });
}
