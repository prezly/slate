import { EditorCommands } from '@prezly/slate-commons';
import { isParagraphNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Node, Range } from 'slate';

import { MENU_TRIGGER_CHARACTER } from './isMenuHotkey';

export function shouldShowMenuButton(editor: Editor): boolean {
    if (!editor.selection || Range.isExpanded(editor.selection)) {
        return false;
    }

    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!isParagraphNode(currentNode)) {
        return false;
    }

    const text = Node.string(currentNode);

    return text === '' || text === MENU_TRIGGER_CHARACTER;
}
