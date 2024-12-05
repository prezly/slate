import { isHeadingNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Node } from 'slate';
import { Path } from 'slate';

const isTab = isHotkey('tab');
const isShiftTab = isHotkey('shift+tab');

export function onTabSwitchBlock(
    editor: SlateEditor,
    event: KeyboardEvent,
    match: (node: Node) => boolean = isHeadingNode,
): boolean | void {
    if (editor.selection !== null && isTab(event)) {
        for (const [, path] of editor.nodes({ match })) {
            const next = Path.next(path);
            if (editor.hasPath(next)) {
                event.preventDefault();
                editor.select(editor.start(next));
                return true;
            }
        }
    }
    if (editor.selection !== null && isShiftTab(event)) {
        for (const [, path] of editor.nodes({ match })) {
            const prev = Path.hasPrevious(path) ? Path.previous(path) : null;
            if (prev && editor.hasPath(prev)) {
                event.preventDefault();
                editor.select(editor.start(prev));
                return true;
            }
        }
    }
}
