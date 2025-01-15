import { isHeadingNode } from '@prezly/slate-types';
import { PathApi, type Node, type SlateEditor } from '@udecode/plate';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

const isTab = isHotkey('tab');
const isShiftTab = isHotkey('shift+tab');

export function onTabSwitchBlock(
    editor: SlateEditor,
    event: KeyboardEvent,
    match: (node: Node) => boolean = isHeadingNode,
): boolean | void {
    if (editor.selection !== null && isTab(event)) {
        for (const [, path] of editor.api.nodes({ match })) {
            const next = PathApi.next(path);
            if (editor.api.hasPath(next)) {
                event.preventDefault();
                editor.tf.select(editor.api.start(next));
                return true;
            }
        }
    }
    if (editor.selection !== null && isShiftTab(event)) {
        for (const [, path] of editor.api.nodes({ match })) {
            const prev = PathApi.hasPrevious(path) ? PathApi.previous(path) : null;
            if (prev && editor.api.hasPath(prev)) {
                event.preventDefault();
                editor.tf.select(editor.api.start(prev));
                return true;
            }
        }
    }
}
