import { EditorCommands } from '@prezly/slate-commons';
import type { CoverageNode } from '@prezly/slate-types';
import { isCoverageNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function getCurrentCoverageNode(editor: SlateEditor): CoverageNode | null {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (isCoverageNode(currentNode)) {
        return currentNode;
    }

    return null;
}
