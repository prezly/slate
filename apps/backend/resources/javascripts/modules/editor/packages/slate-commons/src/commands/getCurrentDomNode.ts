import type { SlateEditor } from '@udecode/plate-common';
import { toDOMNode } from '@udecode/plate-common/react';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';

export function getCurrentDomNode(editor: SlateEditor): HTMLElement | null {
    const [currentNode] = getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return null;
    }

    return toDOMNode(editor, currentNode) ?? null;
}
