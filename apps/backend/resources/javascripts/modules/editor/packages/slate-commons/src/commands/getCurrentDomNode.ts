import type { SlateEditor } from '@udecode/plate';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';

export function getCurrentDomNode(editor: SlateEditor): HTMLElement | null {
    const [currentNode] = getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return null;
    }

    return editor.api.toDOMNode(currentNode) ?? null;
}
