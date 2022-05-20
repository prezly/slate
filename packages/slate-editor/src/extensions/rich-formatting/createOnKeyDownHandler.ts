import { EditorCommands } from '@prezly/slate-commons';
import { onKeyDown as onListsKeyDown } from '@prezly/slate-lists';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { Editor } from 'slate';

import { MarkType } from './types';

const MARK_HOTKEYS: { hotkey: string; mark: MarkType }[] = [
    { hotkey: 'mod+b', mark: MarkType.BOLD },
    { hotkey: 'mod+i', mark: MarkType.ITALIC },
    { hotkey: 'mod+u', mark: MarkType.UNDERLINED },
];

function marksOnKeyDown(event: KeyboardEvent, editor: Editor) {
    return MARK_HOTKEYS.forEach(({ hotkey, mark }) => {
        if (isHotkey(hotkey, event.nativeEvent)) {
            event.preventDefault();
            EditorCommands.toggleMark(editor, mark);
        }
    });
}

function softBreakOnKeyDown(event: KeyboardEvent, editor: Editor) {
    if (isHotkey('shift+enter', event.nativeEvent) && !event.isDefaultPrevented()) {
        event.preventDefault();
        Editor.insertText(editor, '\n');
    }
}

export function createOnKeyDownHandler(parameters: { blocks: boolean }) {
    return (event: KeyboardEvent, editor: Editor) => {
        softBreakOnKeyDown(event, editor);
        marksOnKeyDown(event, editor);

        if (parameters.blocks) {
            onListsKeyDown(editor, event);
        }
    };
}
