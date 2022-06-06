import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

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
