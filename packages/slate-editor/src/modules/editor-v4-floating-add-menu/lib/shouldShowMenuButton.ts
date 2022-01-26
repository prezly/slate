import { EditorCommands } from '@prezly/slate-commons';
import { isHeadingNode, isParagraphNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Node, Range } from 'slate';

import { MENU_TRIGGER_CHARACTER } from './isMenuHotkey';

export function shouldShowMenuButton(editor: Editor): boolean {
    if (!editor.selection || Range.isExpanded(editor.selection)) {
        return false;
    }

    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return false;
    }

    if (isParagraphNode(currentNode) || isHeadingNode(currentNode)) {
        const text = Node.string(currentNode);

        return text === '' || text === MENU_TRIGGER_CHARACTER;
    }

    return false;
}
