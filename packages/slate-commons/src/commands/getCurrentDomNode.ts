import type { Editor } from 'slate';
import type { ReactEditor } from 'slate-react';

import { getCurrentNodeEntry } from './getCurrentNodeEntry';
import { toDomNode } from './toDomNode';

export function getCurrentDomNode(editor: Editor & ReactEditor): HTMLElement | null {
    const [currentNode] = getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return null;
    }

    return toDomNode(editor, currentNode);
}
