import { isHeadingNode } from '@prezly/slate-types';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Node } from 'slate';
import { Editor, Path, Transforms } from 'slate';

const isTab = isHotkey('tab');
const isShiftTab = isHotkey('shift+tab');

export function onTabSwitchBlock(
    editor: Editor,
    event: KeyboardEvent,
    match: (node: Node) => boolean = isHeadingNode,
): boolean | void {
    if (editor.selection !== null && isTab(event)) {
        for (const [, path] of Editor.nodes(editor, { match })) {
            const next = Path.next(path);
            if (Editor.hasPath(editor, next)) {
                event.preventDefault();
                Transforms.select(editor, Editor.start(editor, next));
                return true;
            }
        }
    }
    if (editor.selection !== null && isShiftTab(event)) {
        for (const [, path] of Editor.nodes(editor, { match })) {
            const prev = Path.hasPrevious(path) ? Path.previous(path) : null;
            if (prev && Editor.hasPath(editor, prev)) {
                event.preventDefault();
                Transforms.select(editor, Editor.start(editor, prev));
                return true;
            }
        }
    }
}
