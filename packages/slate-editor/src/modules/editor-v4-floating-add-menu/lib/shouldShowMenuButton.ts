import { EditorCommands } from '@prezly/slate-commons';
import { isParagraphNode, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
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
    const hasNoPlaceholder = currentNode.children.every(
        (child) => !('type' in child && child.type === PLACEHOLDER_NODE_TYPE),
    );

    return (text.trim() === '' || text === MENU_TRIGGER_CHARACTER) && hasNoPlaceholder;
}
