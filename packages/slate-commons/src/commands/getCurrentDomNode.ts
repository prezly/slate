import type { SlateEditor } from '@udecode/plate-common';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';
import { toDomNode } from './toDomNode';

export function getCurrentDomNode(editor: SlateEditor): HTMLElement | null {
    const [currentNode] = getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return null;
    }

    return toDomNode(editor, currentNode);
}
