import type { Node } from 'slate';
import { Editor } from 'slate';

import { isTopLevelNode } from './isTopLevelNode';

export function isTopLevelNodeSelected(
    editor: Editor,
    node: Node,
    allowMultipleNodesSelected = false,
): boolean {
    const selection = editor.selection;
    if (!selection) return false;

    const selectedNodes = Array.from(Editor.nodes(editor, { match: isTopLevelNode }));

    for (const [selectedNode] of selectedNodes) {
        if (selectedNode === node) {
            return allowMultipleNodesSelected || selectedNodes.length === 1;
        }
    }

    return false;
}
