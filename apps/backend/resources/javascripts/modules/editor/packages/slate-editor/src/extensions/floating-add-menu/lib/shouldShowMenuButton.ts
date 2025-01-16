import { EditorCommands } from '@prezly/slate-commons';
import {
    isHeadingNode,
    isParagraphNode,
    isSubtitleHeadingNode,
    isTitleHeadingNode,
} from '@prezly/slate-types';
import { RangeApi, type SlateEditor } from '@udecode/plate';

import { MENU_TRIGGER_CHARACTER } from './isMenuHotkey';

export function shouldShowMenuButton(editor: SlateEditor): boolean {
    if (!editor.selection || RangeApi.isExpanded(editor.selection)) {
        return false;
    }

    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return false;
    }

    if (!isParagraphNode(currentNode) && !isHeadingNode(currentNode)) {
        return false;
    }

    if (isTitleHeadingNode(currentNode) || isSubtitleHeadingNode(currentNode)) {
        return false;
    }

    if (EditorCommands.hasVoidElements(editor, currentNode)) {
        return false;
    }

    const text = editor.api.string(currentNode);
    return (
        text === '' ||
        text === MENU_TRIGGER_CHARACTER ||
        text.trim() === '' ||
        text === ''.padEnd(text.length, MENU_TRIGGER_CHARACTER)
    );
}
