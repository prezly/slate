import { EditorCommands } from '@prezly/slate-commons';
import type { CoverageNode } from '@prezly/slate-types';
import { isCoverageNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function removeCoverage(editor: SlateEditor, coverage?: CoverageNode): CoverageNode | null {
    return EditorCommands.removeNode<CoverageNode>(editor, {
        match: coverage ? (node) => node === coverage : isCoverageNode,
    });
}
