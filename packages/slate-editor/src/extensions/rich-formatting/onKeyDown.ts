import { EditorCommands } from '@prezly/slate-commons';
import { isHeadingNode, isQuoteNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Node, Path} from 'slate';
import { Editor, Range, Transforms } from 'slate';

import { isDeletingEventBackward } from '#lib';

import { MarkType } from './types';

const MARK_HOTKEYS: { hotkey: string; mark: MarkType }[] = [
    { hotkey: 'mod+b', mark: MarkType.BOLD },
    { hotkey: 'mod+i', mark: MarkType.ITALIC },
    { hotkey: 'mod+u', mark: MarkType.UNDERLINED },
];

export function onHotkeyDoMarks(event: KeyboardEvent, editor: Editor) {
    return MARK_HOTKEYS.forEach(({ hotkey, mark }) => {
        if (isHotkey(hotkey, event.nativeEvent)) {
            event.preventDefault();
            EditorCommands.toggleMark(editor, mark);
        }
    });
}

export function onShiftEnterDoSoftBreak(event: KeyboardEvent, editor: Editor) {
    if (isHotkey('shift+enter', event.nativeEvent) && !event.isDefaultPrevented()) {
        event.preventDefault();
        Editor.insertText(editor, '\n');
    }
}

export function onBackspaceResetFormattingAtDocumentStart(event: KeyboardEvent, editor: Editor) {
    const { selection } = editor;
    if (
        isDeletingEventBackward(event) &&
        selection !== null &&
        isDocumentStart(selection)
    ) {
        if (isFocused(editor, isRichBlock)) {
            Transforms.setNodes(
                editor,
                { type: PARAGRAPH_NODE_TYPE },
                {
                    match: (node, path) =>
                        isRichBlock(node) && EditorCommands.isTopLevelNode(node, path),
                },
            );
        }
    }
}

function isDocumentStart(selection: Range): boolean {
    return (
        Range.isCollapsed(selection) &&
        selection.focus.offset === 0 &&
        // Any node at path [0, ..., 0] is considered the start of the document
        selection.focus.path.every((index) => index === 0)
    );
}

function isFocused(editor: Editor, match: (node: Node, path: Path) => boolean): boolean {
    return Array.from(Editor.nodes(editor, { match })).length > 0;
}

function isRichBlock(node: Node) {
    return isQuoteNode(node) || isHeadingNode(node);
}
